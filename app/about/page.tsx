import React from "react";
import Layout from "../components/Layout";
import GradientSpheres from "../components/GradientSpheres";
import GlassmorphismCard from "../components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ConfinedGradientSpheres,
  GradientCard,
  Sphere,
} from "../components/ConfinedGradientSpheres";
import GradientSpheresDemo from "../components/ConfinedGradientSpheres";
import Card from "../components/Card";
import Link from "next/link";
import { formatToMonthYear, getDurationBetweenDates } from "@/lib/utils";
import Image from "next/image";
import { iconsList } from "../constants";

const About = () => {
  return (
    <Layout>
      {/* <GradientSpheres
        sphere1Class="testimonial-gradient-sphere testimonial-sphere-2"
        sphere2Class="testimonial-gradient-sphere testimonial-sphere-1"
      /> */}
      <div className="pt-[6rem] pb-[2rem] px-[2rem] w-full flex gap-6 ">
        {/* Left column - scrollable with hidden scrollbar */}
        <div
          className="flex flex-col gap-[1.5rem] h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar"
          style={{ position: "sticky", top: "6rem" }}
        >
          <div className="glass-card z-50 rounded-[8px] w-[20rem] h-[20rem] px-6 py-3 flex justify-center items-center gap-6">
            <Avatar className="w-[15rem] h-[15rem] ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-2">
            <span
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-[24px]"
            >
              Details
            </span>

            <div className="glass-card z-50 rounded-[8px] w-[20rem] px-6 py-3 flex flex-col gap-6">
              <div className="flex flex-col gap-[.3rem]  ">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Experience
                </span>
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                  className="font-[600] text-[18px] "
                >
                  3+ years
                </span>
              </div>

              <div className="flex flex-col gap-[.3rem]  ">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Email
                </span>
                <Link
                  href="mailto:anthonydimojiaku@gmail.com"
                  className="hover:text-[#003883] hover:scale-102"
                >
                  <span
                    style={{
                      color: "var(--resume-foreground)",
                    }}
                    className="font-[600] text-[18px] "
                  >
                    anthonydimojiaku@gmail.com
                  </span>
                </Link>
              </div>

              <div className="flex flex-col gap-[.3rem]  ">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Github
                </span>
                <Link
                  href="https://github.com/DimTony"
                  className="hover:text-[#003883] hover:scale-102"
                >
                  <span
                    style={{
                      color: "var(--resume-foreground)",
                    }}
                    className="font-[600] text-[18px]  "
                  >
                    DimTony
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-[24px]"
            >
              Tech Stack
            </span>

            <div className="glass-card z-50 rounded-[8px] w-[20rem] px-6 py-3 flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-[2rem]">
                {iconsList.map((stack, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="flex-none w-15 h-15 bg-black-300 flex-center gradient-border marquee-item hover:-translate-y-3 transition-all duration-700">
                      <img
                        src={stack.image}
                        alt={stack.name}
                        className="size-8"
                      />
                    </div>
                    <span
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                      className="text-[12px] opacity-0 group-hover:opacity-100 transform translate-y-0 group-hover:translate-y-1 transition-all duration-300"
                    >
                      {stack.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-[24px]"
            >
              Interests
            </span>

            <div className="glass-card z-50 rounded-[8px] w-[20rem] px-6 py-3 flex flex-col gap-6">
              {/* <div className="flex flex-col gap-[.3rem]  ">
                <span>Experience</span>
                <span className="font-[600] text-[18px] ">3+ years</span>
              </div> */}
              <div className="grid grid-cols-3 gap-[2rem]">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Chess
                </span>
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Traveling
                </span>
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Reading
                </span>
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Dancing
                </span>
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                >
                  Sports
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-[24px]"
            >
              Currently Learning
            </span>

            <div className="glass-card z-50 rounded-[8px] w-[20rem] px-6 py-3 flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-[2rem]">
                {iconsList.map((stack, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="flex-none w-15 h-15 bg-black-300 flex-center gradient-border marquee-item hover:-translate-y-3 transition-all duration-700">
                      <img
                        src={stack.image}
                        alt={stack.name}
                        className="size-8"
                      />
                    </div>
                    <span
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                      className="text-[12px] opacity-0 group-hover:opacity-100 transform translate-y-0 group-hover:translate-y-1 transition-all duration-300"
                    >
                      {stack.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Card className="w-[65%] h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
          <div className="px-[2rem] py-[2rem] gap-[2rem] flex flex-col">
            <span
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-[2rem] z-10"
            >
              Work Experience
            </span>

            {[
              {
                icon: "/images/Access.svg",
                role: "Frontend Engineer",
                company: "Access Bank Plc",
                startDate: "1998-10-06 00:00:00",
                endDate: "2025-10-07 00:00:00",
                description:
                  "At Lolico, I had the opportunity to serve as both a team lead and an engineering manager for a team. In my role as a team lead, I maintained close communication with the client, planned upcoming work, estimated tasks, and ensured smooth operations. As an engineering manager, I prioritized team happiness and developed growth plans for engineers. Additionally, I gained experience as a technical interviewer for the hiring team. In my capacity as an engineer, I worked with various technologies including frontend, backend, desktop applications, and Debian packages. Notably, I successfully implemented a UI Kit and led the redesign of a web application.",
              },
              {
                icon: "/images/Access.svg",
                role: "Frontend Engineer",
                company: "Access Bank Plc",
                startDate: "1998-10-06 00:00:00",
                endDate: "2025-10-07 00:00:00",
                description:
                  "At Lolico, I had the opportunity to serve as both a team lead and an engineering manager for a team. In my role as a team lead, I maintained close communication with the client, planned upcoming work, estimated tasks, and ensured smooth operations. As an engineering manager, I prioritized team happiness and developed growth plans for engineers. Additionally, I gained experience as a technical interviewer for the hiring team. In my capacity as an engineer, I worked with various technologies including frontend, backend, desktop applications, and Debian packages. Notably, I successfully implemented a UI Kit and led the redesign of a web application.",
              },
            ].map((exp, index) => (
              <div key={index} className="flex flex-col z-10">
                <div className="flex flex-col  ">
                  <div className="flex gap-[1rem] items-center">
                    {/* <div className="w-[2.5rem] z-10 h-[2.5rem] bg-red-200 " /> */}

                    {/* <img
                      src="/images/CaretRight.svg"
                      alt="Right"
                      className="w-5 h-5"
                    /> */}

                    <Image
                      src={exp.icon}
                      alt="company"
                      width={40}
                      height={40}
                    />

                    <div className="flex flex-col">
                      <span
                        style={{
                          color: "var(--resume-foreground)",
                        }}
                        className=" text-[1.2rem] font-[600] "
                      >
                        {exp.role}
                      </span>
                      <span
                        style={{
                          color: "var(--resume-foreground)",
                        }}
                        className="translate-y-[-5px]"
                      >
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      color: "var(--resume-foreground)",
                    }}
                    className="text-[.8rem] my-1"
                  >
                    {formatToMonthYear(exp.startDate)} -{" "}
                    {formatToMonthYear(exp.endDate)} ⋅{" "}
                    {getDurationBetweenDates(exp.startDate, exp.endDate)}
                  </span>

                  <span
                    style={{
                      color: "var(--resume-foreground)",
                    }}
                    className="text-[.9rem]"
                  >
                    {exp.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
