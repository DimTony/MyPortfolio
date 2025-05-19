"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import MarqueeComponent from "../components/Marquee";
import { useStore } from "@/store/store";
import Image from "next/image";

// Define project types
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  role?: string;
  dash?: string;
  thumbnail?: string;
  releaseStatus?: string;
  maintainStatus?: string;
  date?: string;
  desc?: any;
};

// Sample projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Credit Monitoring Portal",
    description:
      "This is going to be a truncated description of the project which when hovered over reveals a more detailed description",
    technologies: ["TypeScript", "Next.js", "Node.js", "React", "TailwindCSS"],
    role: "Frontend Engineer",
    dash: "/images/credit-monitoring-dash.png",
    thumbnail: "/images/credit-monitoring.png",
    releaseStatus: "Pilot-released",
    maintainStatus: "Maintained",
    date: "Jan 2029",
    desc: {
      title:
        "Project Description: AccessAfrica Integration on Digital Channels",
      summary:
        " The AccessAfrica Integration on Digital Channels project aims to enhance Access Bank's cross-border payment capabilities by revamping the AccessAfrica platform and extending its reach across all digital channels. The initiative enables customers to initiate international transactions—both to countries where Access Bank has subsidiaries and where it does not—directly through AccessMore, Internet Banking, and PrimusPlus, eliminating the need to visit a branch.",
      objectives: [
        "A redesigned API supporting international transactions via digital channels.",
        "A new AccessAfrica Admin Portal for back-office operations and compliance.",
        "Revamped branch interface for improved transaction processing.",
        "Document upload capability within the transaction flow.",
        "A multi-step transaction review and authorization process involving FFT teams.",
        "Seamless integration with third-party processors and fintech partners.",
        "Enhanced security, compliance, and customer experience.",
      ],
      footer:
        " This rollout will occur in phases, starting with the AccessMore app and later extending to other digital platforms. The project ultimately improves revenue, expands customer reach, and supports 24/7 cross-border payment accessibility.",
    },
  },
  {
    id: 2,
    title: "HR Management Portal",
    description:
      "A full-stack application with authentication and database integration for managing customer relationships",
    technologies: ["JavaScript", "Express", "MongoDB", "JWT", "Redux"],
    role: "Frontend Engineer",
    dash: "/images/hr-dash.png",
    thumbnail: "/images/hr.png",
    releaseStatus: "Beta-released",
    maintainStatus: "Deprecated",
    date: "Dec 1998",
    desc: {
      title:
        "Project Description: AccessAfrica Integration on Digital Channels",
      summary:
        " The AccessAfrica Integration on Digital Channels project aims to enhance Access Bank's cross-border payment capabilities by revamping the AccessAfrica platform and extending its reach across all digital channels. The initiative enables customers to initiate international transactions—both to countries where Access Bank has subsidiaries and where it does not—directly through AccessMore, Internet Banking, and PrimusPlus, eliminating the need to visit a branch.",
      objectives: [
        "A redesigned API supporting international transactions via digital channels.",
        "A new AccessAfrica Admin Portal for back-office operations and compliance.",
        "Revamped branch interface for improved transaction processing.",
        "Document upload capability within the transaction flow.",
        "A multi-step transaction review and authorization process involving FFT teams.",
        "Seamless integration with third-party processors and fintech partners.",
        "Enhanced security, compliance, and customer experience.",
      ],
      footer:
        " This rollout will occur in phases, starting with the AccessMore app and later extending to other digital platforms. The project ultimately improves revenue, expands customer reach, and supports 24/7 cross-border payment accessibility.",
    },
  },
  {
    id: 3,
    title: "Access Africa Admin Portal",
    description:
      "Mobile application for tracking fitness goals and daily nutrition with social sharing capabilities",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "NativeBase"],
    role: "Frontend Engineer",
    thumbnail: "/images/aa-dash.png",
    dash: "/images/aa-dash.png",
    releaseStatus: "Beta-released",
    maintainStatus: "Under-development",
    date: "Oct 2106",
    desc: {
      title:
        "Project Description: AccessAfrica Integration on Digital Channels",
      summary:
        " The AccessAfrica Integration on Digital Channels project aims to enhance Access Bank's cross-border payment capabilities by revamping the AccessAfrica platform and extending its reach across all digital channels. The initiative enables customers to initiate international transactions—both to countries where Access Bank has subsidiaries and where it does not—directly through AccessMore, Internet Banking, and PrimusPlus, eliminating the need to visit a branch.",
      objectives: [
        "A redesigned API supporting international transactions via digital channels.",
        "A new AccessAfrica Admin Portal for back-office operations and compliance.",
        "Revamped branch interface for improved transaction processing.",
        "Document upload capability within the transaction flow.",
        "A multi-step transaction review and authorization process involving FFT teams.",
        "Seamless integration with third-party processors and fintech partners.",
        "Enhanced security, compliance, and customer experience.",
      ],
      footer:
        " This rollout will occur in phases, starting with the AccessMore app and later extending to other digital platforms. The project ultimately improves revenue, expands customer reach, and supports 24/7 cross-border payment accessibility.",
    },
  },
];

// Sample thinktank projects data
const thinktankData: Project[] = [
  {
    id: 1,
    title: "Research Paper 1",
    description:
      "Exploring the applications of machine learning in predictive healthcare analytics and patient outcomes",
    technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "Jupyter"],
  },
  {
    id: 2,
    title: "Concept Design",
    description:
      "Design exploration for a sustainable smart home system that reduces energy consumption while improving user experience",
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Prototyping"],
  },
  {
    id: 3,
    title: "Thesis Project",
    description:
      "Investigating the ethical implications of AI decision-making systems in judicial proceedings and legal frameworks",
    technologies: ["Research", "Documentation", "Analysis", "Ethics", "Legal"],
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
  },
];

// Component to display a single project
const ProjectItem = ({ project }: { project: Project }) => {
  const { setSelectedProject } = useStore();

  return (
    <div
      onClick={() => setSelectedProject(project)}
      className="hover:cursor-pointer hover:scale-102 py-[1rem]"
    >
      <div className="flex gap-2">
        <div className="w-[40%] h-[6rem] rounded-[8px] glass-card">
          <img
            src={project.thumbnail}
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
            {project.technologies.map((tech, index) => (
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

const Projects = () => {
  const { activeTab, selectedProject, setActiveTab } = useStore();

  // Get the appropriate data based on the active tab
  const currentProjects =
    activeTab === "projects" ? projectsData : thinktankData;

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

  return (
    <Layout>
      <Card className="w-full h-full no-scrollbar">
        <div className="pt-[6rem] pb-[2rem] px-[2rem] w-full h-full flex flex-col no-scrollbar ">
          <div className="w-full gap-[1rem] z-10 flex no-scrollbar mb-6">
            <div className="w-[70%] h-[26rem] rounded-[8px] ">
              {selectedProject ? (
                <div className="h-full flex flex-col justify-between px-[1rem]">
                  <div className="">
                    <img
                      src={selectedProject.dash}
                      alt="thumbanil"
                      className="h-full object-contain border-2 border-gray-300 rounded-[8px] overflow-hidden"
                    />
                  </div>
                  <div className="w-full ">
                    {/* <span>TITLE HERE</span> */}
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
              ) : (
                <div>
                  <span
                    style={{
                      color: "var(--foreground-neg)",
                    }}
                  >
                    E no dey
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
                {currentProjects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex gap-[2rem] z-10">
            <div className="glass-card px-[1rem] py-[1rem] rounded-[8px] w-[70%] no-scrollbar">
              <div className="flex items-center gap-3 mb-[1rem]">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                    selectedProject.releaseStatus === "Beta-released"
                      ? "bg-[#F3F0FF] text-[#6941C6] border border-[#D9D6FE]" // Plum/Purple
                      : selectedProject.releaseStatus === "Pilot-released"
                      ? "bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]" // Sky blue
                      : selectedProject.releaseStatus === "Inactive"
                      ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]" // Amber
                      : selectedProject.releaseStatus === "Active"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]" // Indigo
                      : selectedProject.releaseStatus === "In-progress"
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
                  className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                    selectedProject.maintainStatus === "Deprecated"
                      ? "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                      : selectedProject.maintainStatus === "Maintained"
                      ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
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
                  {selectedProject.date}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedProject.desc.title ?? ""}
                </h2>
                <p className="mb-4">{selectedProject.desc.summary ?? ""}</p>
                <ul className="list-disc list-inside space-y-2">
                  {selectedProject.desc.objectives.map((obj: any, idx: any) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
                <p className="mt-4">{selectedProject.desc.footer ?? ""}</p>
              </div>
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
                      className="w-full  border-y border-[var(--glassmorph-nav-border)] rounded-[8px] flex flex-col gap-4 p-[.5rem]"
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
        </div>
      </Card>
    </Layout>
  );
};

export default Projects;
