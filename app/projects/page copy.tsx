"use client";

import { useStore } from "@/store/store";
import MarqueeComponent from "../components/Marquee";
import Layout from "../components/Layout";
import Card from "../components/Card";
// Import prisma in a different way for client components
import { getProjects } from "@/lib/data";

// Updated type definition to match the Prisma schema
import { useState, useEffect } from "react";
import { formatDateToMonthYear } from "@/lib/utils";

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
};

const thinktankData: Project[] = [
  {
    id: 1,
    title: "Research Paper 1",
    description:
      "Exploring the applications of machine learning in predictive healthcare analytics and patient outcomes",
    technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "Jupyter"],
    role: "Researcher",
    dash: "/images/placeholder.png",
    thumbnail: "/images/placeholder.png",
    releaseStatus: "In-progress",
    maintainStatus: "Maintained",
    date: "May 2025",
  },
  {
    id: 2,
    title: "Concept Design",
    description:
      "Design exploration for a sustainable smart home system that reduces energy consumption while improving user experience",
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Prototyping"],
    role: "Designer",
    dash: "/images/placeholder.png",
    thumbnail: "/images/placeholder.png",
    releaseStatus: "Beta-released",
    maintainStatus: "Maintained",
    date: "Apr 2025",
  },
  {
    id: 3,
    title: "Thesis Project",
    description:
      "Investigating the ethical implications of AI decision-making systems in judicial proceedings and legal frameworks",
    technologies: ["Research", "Documentation", "Analysis", "Ethics", "Legal"],
    role: "Lead Researcher",
    dash: "/images/placeholder.png",
    thumbnail: "/images/placeholder.png",
    releaseStatus: "Testing",
    maintainStatus: "Maintained",
    date: "Mar 2025",
  },
  {
    id: 4,
    title: "Experimental Tech",
    description:
      "Prototyping a blockchain-based voting system with enhanced security features and transparent audit capabilities",
    technologies: [
      "Blockchain",
      "Solidity",
      "Web3",
      "Cryptography",
      "Smart Contracts",
    ],
    role: "Blockchain Engineer",
    dash: "/images/placeholder.png",
    thumbnail: "/images/placeholder.png",
    releaseStatus: "Pilot-released",
    maintainStatus: "Under-development",
    date: "Feb 2025",
  },
];

const ProjectItem = ({ project }: { project: Project }) => {
  const { setSelectedProject } = useStore();

  // Parse technologies if it's a string
  const technologies = typeof project.technologies === 'string'
    ? JSON.parse(project.technologies)
    : project.technologies;

  return (
    <div
      onClick={() => setSelectedProject(project)}
      className="hover:cursor-pointer hover:scale-102 py-[1rem]"
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
                key={index}
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

// First, let's create a ProjectItemSkeleton component
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
  const { activeTab, selectedProject, setActiveTab } = useStore();

  // State for projects and comments
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();

        console.log('cccc', data)
        setProjects(data);

      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Fetch comments when a project is selected
  // useEffect(() => {
  //   if (selectedProject?.id) {
  //     fetchComments(selectedProject.id);
  //   }
  // }, [selectedProject]);

  // Function to fetch comments for a project
  // async function fetchComments(projectId: number) {
  //   try {
  //     const response = await fetch(`/api/projects/${projectId}/comments`);
  //     if (!response.ok) throw new Error('Failed to fetch comments');
  //     const data = await response.json();
  //     setComments(data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // }

  // Function to submit a new comment
  // async function submitComment(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!selectedProject?.id || !commentName.trim() || !commentContent.trim()) return;

  //   try {
  //     setSubmittingComment(true);
  //     const response = await fetch(`/api/projects/${selectedProject.id}/comments`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         authorName: commentName,
  //         content: commentContent,
  //       }),
  //     });

  //     if (!response.ok) throw new Error('Failed to submit comment');

  //     // Reset form
  //     setCommentName("");
  //     setCommentContent("");

  //     // Show a message about comment moderation
  //     alert("Thank you for your comment! It will be visible after moderation.");

  //   } catch (error) {
  //     console.error("Error submitting comment:", error);
  //     alert("Failed to submit your comment. Please try again.");
  //   } finally {
  //     setSubmittingComment(false);
  //   }
  // }

  // Get the appropriate data based on the active tab
  const currentProjects =
    activeTab === "projects" ? projects : thinktankData;

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

  // Default selected project if none is selected
  const displayedProject = selectedProject || (currentProjects.length > 0 ? currentProjects[0] : null);

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
              ) : displayedProject ? (
                // Original display project content
                <div className="h-full flex flex-col justify-between px-[1rem]">
                  <div className="h-full flex flex-col justify-between px-[1rem]">
                    <div className="">
                      <img
                        src={displayedProject.dash || "/images/placeholder.png"}
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
                        {displayedProject.title}
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
            <div className="w-[30%] flex flex-col">
              <div className="flex px-3 items-center gap-2">
                <button
                  onClick={() => setActiveTab("projects")}
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
                  {/* <span>{displayedProject.dash}</span> */}
                  <span>Projects</span>
                </button>
                <button
                  onClick={() => setActiveTab("thinktank")}
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
                </button>
              </div>

              {/* Projects container with scrolling if needed */}
              <div className="mt-2 px-3 max-h-[24rem] overflow-y-auto no-scrollbar">
                {loading ? (
                  // Show skeletons while loading
                  Array(4).fill(0).map((_, index) => (
                    <ProjectItemSkeleton key={`skeleton-${index}`} />
                  ))
                ) : (
                  // Show actual projects when loaded
                  currentProjects.map((project: any) => (
                    <ProjectItem key={project.id} project={project} />
                  ))
                )}
              </div>
            </div>
          </div>

          {displayedProject && (
            <div className="w-full flex gap-[2rem] z-10">
              <div className="glass-card px-[1rem] py-[1rem] rounded-[8px] w-[70%] no-scrollbar">
                <div className="flex items-center gap-3 mb-[1rem]">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${displayedProject.releaseStatus === "Beta-released"
                      ? "bg-[#F3F0FF] text-[#6941C6] border border-[#D9D6FE]" // Plum/Purple
                      : displayedProject.releaseStatus === "Pilot-released"
                        ? "bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]" // Sky blue
                        : displayedProject.releaseStatus === "Inactive"
                          ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]" // Amber
                          : displayedProject.releaseStatus === "Active"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]" // Indigo
                            : displayedProject.releaseStatus === "In-progress"
                              ? "bg-[#FAE8FF] text-[#9333EA] border border-[#E9D5FF]" // Violet
                              : displayedProject.releaseStatus === "Production"
                                ? "bg-[#ECFEFF] text-[#0E7490] border border-[#A5F3FC]" // Cyan
                                : displayedProject.releaseStatus === "Testing"
                                  ? "bg-[#FDF2FA] text-[#C026D3] border border-[#FBCFE8]" // Fuchsia
                                  : displayedProject.releaseStatus === "Deprecated"
                                    ? "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]" // Cool Gray
                                    : displayedProject.releaseStatus === "On-hold"
                                      ? "bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]" // Deep Purple
                                      : "bg-gray-100 text-gray-600 border border-gray-300"
                      }`}
                  >
                    {displayedProject.releaseStatus}
                  </span>

                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${displayedProject.maintainStatus === "Deprecated"
                      ? "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                      : displayedProject.maintainStatus === "Maintained"
                        ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
                        : displayedProject.maintainStatus === "Under-development"
                          ? "bg-[#FDF4FF] text-[#A21CAF] border border-[#F5D0FE]"
                          : "bg-gray-100 text-gray-600 border border-gray-300"
                      }`}
                  >
                    {displayedProject.maintainStatus}
                  </span>

                  <span
                    style={{
                      color: "var(--foreground-neg)",
                    }}
                  >
                    {formatDateToMonthYear(displayedProject.date)}
                  </span>
                </div>

                {displayedProject.desc ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      {displayedProject.desc.title}
                    </h2>
                    <p className="mb-4">{displayedProject.desc.summary}</p>

                    {displayedProject.desc.objectives && displayedProject.desc.objectives.length > 0 && (
                      <ul className="list-disc list-inside space-y-2">
                        {displayedProject.desc.objectives.map((obj: Objective, index: any) => (
                          <li key={index}>{obj.text}</li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4">{displayedProject.desc.footer}</p>
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
                <div className="glass-card rounded-[8px] w-full p-[1rem] no-scrollbar">
                  <div className="w-full flex flex-col gap-4 p-[.5rem]">
                    <div className="flex items-center gap-2">
                      <img
                        src={getRandomString()}
                        alt="visitor"
                        className="w-5 h-5"
                      />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="h-[1rem] px-2 py-3 text-[.8rem] focus:outline-none rounded-[4px]"
                        style={{
                          background: "var(--neg-back)",
                          color: "var(--input-color)",
                        }}
                      />
                    </div>

                    <textarea
                      placeholder="Enter comment..."
                      className="min-h-[5rem] p-1 text-[13px] focus:outline-none focus:border-[#6886c5] w-full border-b-1 border-[#888] rounded-[8px]"
                      style={{
                        color: "var(--input-color)",
                      }}
                    />

                    <div className="w-full flex justify-end">
                      <button className="glass-card rounded-[8px] px-2 py-1 cursor-pointer hover:scale-103 ">
                        <span className="text-[12px]">Comment</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-[8px] w-full max-h-[25rem] p-[1rem] overflow-auto no-scrollbar">
                  <div>
                    {[
                      {
                        sender: "Jane Doe",
                        comment: "Awesome Stuff!",
                      },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                    ].map((notif, idx) => (
                      <div
                        key={idx}
                        className="w-full border-y border-[var(--glassmorph-nav-border)] rounded-[8px] flex flex-col gap-4 p-[.5rem]"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={getRandomString()}
                            alt="visitor"
                            className="w-5 h-5"
                          />
                          <span
                            style={{
                              color: "var(--resume-foreground)",
                            }}
                            className="text-[.8rem]"
                          >
                            Jane Doe
                          </span>
                        </div>

                        <span
                          style={{
                            color: "var(--resume-foreground)",
                          }}
                          className="text-[.8rem]"
                        >
                          Awesome stuff!
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Layout>
  );
}