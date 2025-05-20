"use client";

import { useStore } from "@/store/store";
import MarqueeComponent from "../components/Marquee";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { formatDateToMonthYear } from "@/lib/utils";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { ProjectTab } from "@/types";

type Objective = {
  id: number;
  text: string;
  descriptionId: number;
};

type ProjectDescription = {
  id: number;
  title: string;
  summary: string;
  footer: string;
  objectives: Objective[];
};

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string | string[]; // Can be string (JSON) or parsed array
  role: string;
  dash: string;
  thumbnail: string;
  releaseStatus: string;
  maintainStatus: string;
  date: string;
  githubUrl?: string;
  demoUrl?: string;
  desc?: ProjectDescription;
  descId?: number;
  comments?: any[];
};

const ProjectItem = ({ project }: { project: Project }) => {
  const { selectedProject, setSelectedProject } = useStore();

  // Parse technologies if it's a string
  const technologies = typeof project.technologies === 'string'
    ? JSON.parse(project.technologies)
    : project.technologies;

  const isSelected = selectedProject && selectedProject.id === project.id;

  return (
    <div
      onClick={() => setSelectedProject(project)}
      className={`hover:cursor-pointer hover:scale-102 p-[1rem] 
        ${isSelected ? 'glass-card rounded-md' : ''}`}
    >
      <div className="flex gap-2">
        <div className="w-[40%] h-[6rem] rounded-[8px] glass-card">
          <img
            src={project.thumbnail || "/images/placeholder.png"}
            alt="thumbnail"
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
        <div className="w-[60%] flex justify-between flex-col">
          <div className="flex flex-col">
            <div className="w-full flex justify-between">
              <span className="text-[var(--text-color-ccc)] font-[600] ">
                {project.title}
              </span>
              <span className="ellipsis-icon">⋮</span>
            </div>
            <span
              className="text-[12px] text-[var(--text-color-ccc)] line-clamp-2 overflow-hidden"
              title={project.description}
            >
              {project.description}
            </span>
          </div>

          <MarqueeComponent>
            {technologies.map((tech: string, index: number) => (
              <span
                key={`tech-${index}-${project.id}`}
                className="text-[10px] text-[var(--text-color-ccc)] px-2 py-[2px] border rounded-full"
              >
                {tech}
              </span>
            ))}
          </MarqueeComponent>
        </div>
      </div>
    </div>
  );
};

// Project item skeleton for loading state
const ProjectItemSkeleton = () => {
  return (
    <div className="py-[1rem]">
      <div className="flex gap-2">
        <div className="w-[40%] h-[6rem] rounded-[8px] bg-gray-300 animate-pulse"></div>
        <div className="w-[60%] flex justify-between flex-col">
          <div className="flex flex-col">
            <div className="w-full flex justify-between">
              <div className="w-[70%] h-[1.2rem] bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-[1rem] h-[1.2rem] bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="w-full h-[2.4rem] bg-gray-300 rounded-md mt-1 animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[1.2rem] w-[3rem] bg-gray-300 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  // Get all required state and actions from the store
  const { activeTab, selectedProject, setActiveTab, setSelectedProject } = useStore();

  // Local state for projects and thinktank data
  const [projects, setProjects] = useState<Project[]>([]);
  const [thinktankData, setThinktankData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function for comments
  function getRandomString(): string {
    const options = [
      "/images/user1.svg",
      "/images/user2.svg",
      "/images/user3.svg",
      "/images/user1.svg",
      "/images/user2.svg",
    ];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  // Handle tab changes properly with the store
  const handleTabChange = (tab: ProjectTab) => {
    // Important: Set selectedProject to null before changing the tab
    setSelectedProject(null);
    setActiveTab(tab);
  };

  // Fetch projects or thinktank data when needed
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        if (activeTab === "projects") {
          const response = await fetch('/api/projects');
          if (!response.ok) throw new Error('Failed to fetch projects');
          const data = await response.json();
          setProjects(data);
          
          // Select first project if none is selected
          if (!selectedProject && data.length > 0) {
            setSelectedProject(data[0]);
          }
        } else if (activeTab === "thinktank") {
          const response = await fetch('/api/thinktanks');
          if (!response.ok) throw new Error('Failed to fetch thinktank data');
          const data = await response.json();
          setThinktankData(data);
          
          // Select first thinktank project if none is selected
          if (!selectedProject && data.length > 0) {
            setSelectedProject(data[0]);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, setSelectedProject]);

  // Get the appropriate data based on the active tab
  const currentProjects = activeTab === "projects" ? projects : thinktankData;

  // Parse technologies if needed for display
  const parseTechnologies = (tech: string | string[]): string[] => {
    if (typeof tech === 'string') {
      try {
        return JSON.parse(tech);
      } catch (e) {
        console.error("Failed to parse technologies:", e);
        return [];
      }
    }
    return tech;
  };

  return (
    <Layout>
      <Card className="w-full h-full no-scrollbar">
        <div className="pt-[6rem] pb-[2rem] px-[2rem] w-full h-full flex flex-col no-scrollbar ">
          <div className="w-full gap-[1rem] z-10 flex no-scrollbar mb-6">
            <div className="w-[70%] h-[26rem] rounded-[8px] ">
              {loading ? (
                // Skeleton for the main project display
                <div className="h-full flex flex-col justify-between px-[1rem]">
                  <div className="h-[calc(100%-3rem)] w-full bg-gray-300 rounded-[8px] animate-pulse"></div>
                  <div className="w-full h-[2rem] bg-gray-300 rounded-[8px] mt-2 animate-pulse"></div>
                </div>
              ) : selectedProject ? (
                // Original display project content
                <div className="h-full flex flex-col justify-between px-[1rem]">
                  <div className="h-full flex flex-col justify-between px-[1rem]">
                    <div className="">
                      <img
                        src={selectedProject.dash || "/images/placeholder.png"}
                        alt="thumbnail"
                        className="h-full object-contain border-2 border-gray-300 rounded-[8px] overflow-hidden"
                      />
                    </div>
                    <div className="w-full ">
                      <span
                        style={{
                          backgroundColor:
                            "rgba(var(--resume-background-rgb), 0.25)",
                          color: "var(--resume-foreground)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.125)",
                          boxShadow:
                            "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                        }}
                        className="px-4 py-2 rounded-[8px] w-full font-medium"
                      >
                        {selectedProject.title}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      color: "var(--foreground-neg)",
                    }}
                  >
                    No project selected
                  </span>
                </div>
              )}
            </div>
            <div className="w-[35%] flex flex-col">
              <div className="flex px-3 items-center gap-2">
                <button
                  onClick={() => handleTabChange("projects")}
                  style={{
                    color:
                      activeTab === "projects"
                        ? "var(--foreground-neg)"
                        : "var(--neg-fore)",
                    backgroundColor:
                      activeTab === "projects"
                        ? "var(--background-neg)"
                        : "var(--neg-back)",
                  }}
                  className="cursor-pointer rounded-[8px] px-2 py-1"
                >
                  <span>Projects</span>
                </button>
                {/* <button
                  onClick={() => handleTabChange("thinktank")}
                  style={{
                    color:
                      activeTab === "thinktank"
                        ? "var(--foreground-neg)"
                        : "var(--neg-fore)",
                    backgroundColor:
                      activeTab === "thinktank"
                        ? "var(--background-neg)"
                        : "var(--neg-back)",
                  }}
                  className="cursor-pointer rounded-[8px] px-2 py-1"
                >
                  <span>ThinkTank</span>
                </button> */}
              </div>

              {/* Projects container with scrolling if needed */}
              <div className="mt-2 p-2 max-h-[24rem] overflow-y-auto no-scrollbar">
                {loading ? (
                  // Show skeletons while loading
                  Array(4).fill(0).map((_, index) => (
                    <ProjectItemSkeleton key={`skeleton-${index}`} />
                  ))
                ) : (
                  // Show actual projects when loaded
                  currentProjects.map((project: Project) => (
                    <ProjectItem key={`project-${project.id}-${activeTab}`} project={project} />
                  ))
                )}
              </div>
            </div>
          </div>

          {selectedProject && (
            <div className="w-full flex gap-[2rem] z-10">
              <div className="glass-card px-[1rem] py-[1rem] rounded-[8px] w-[70%] no-scrollbar">
                <div className="flex items-center gap-3 mb-[1rem]">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${selectedProject.releaseStatus === "Beta-released"
                      ? "bg-[#F3F0FF] text-[#6941C6] border border-[#D9D6FE]" // Plum/Purple
                      : selectedProject.releaseStatus === "Pilot-released"
                        ? "bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]" // Sky blue
                        : selectedProject.releaseStatus === "Inactive"
                          ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]" // Amber
                          : selectedProject.releaseStatus === "Active"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]" // Indigo
                            : selectedProject.releaseStatus === "In-development"
                              ? "bg-[#FAE8FF] text-[#9333EA] border border-[#E9D5FF]" // Violet
                              : selectedProject.releaseStatus === "Production"
                                ? "bg-[#ECFEFF] text-[#0E7490] border border-[#A5F3FC]" // Cyan
                                : selectedProject.releaseStatus === "Testing"
                                  ? "bg-[#FDF2FA] text-[#C026D3] border border-[#FBCFE8]" // Fuchsia
                                  : selectedProject.releaseStatus === "Deprecated"
                                    ? "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]" // Cool Gray
                                    : selectedProject.releaseStatus === "On-hold"
                                      ? "bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]" // Deep Purple
                                      : "bg-gray-100 text-gray-600 border border-gray-300"
                      }`}
                  >
                    {selectedProject.releaseStatus}
                  </span>

                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${selectedProject.maintainStatus === "Deprecated"
                      ? "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                      : selectedProject.maintainStatus === "Maintained"
                        ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
                        : selectedProject.maintainStatus === "Deprecated"
                          ? "bg-[#FDF4FF] text-[#A21CAF] border border-[#F5D0FE]"
                          : "bg-gray-100 text-gray-600 border border-gray-300"
                      }`}
                  >
                    {selectedProject.maintainStatus}
                  </span>

                  <span
                    style={{
                      color: "var(--foreground-neg)",
                    }}
                  >
                    {formatDateToMonthYear(selectedProject.date)}
                  </span>
                </div>

                {selectedProject.desc ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      {selectedProject.desc.title}
                    </h2>
                    <p className="mb-4">{selectedProject.desc.summary}</p>

                    {selectedProject.desc.objectives && selectedProject.desc.objectives.length > 0 && (
                      <ul className="list-disc list-inside space-y-2">
                        {selectedProject.desc.objectives.map((obj: Objective, index: number) => (
                          <li key={`obj-${obj.id || index}`}>{obj.text}</li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4">{selectedProject.desc.footer}</p>
                  </div>
                ) : (
                  <div>
                    <p>No detailed description available for this project.</p>
                  </div>
                )}
              </div>

              <div className="w-[30%] flex flex-col gap-2">
                <span
                  style={{ color: "var(--resume-foreground)" }}
                  className="text-2xl"
                >
                  Comments
                </span>
                
                {selectedProject && (
                  <>
                    <CommentForm projectId={selectedProject.id} />
                  </>
                )}

                {selectedProject.comments && (
                  <>
                    <CommentList comments={selectedProject.comments} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Layout>
  );
}