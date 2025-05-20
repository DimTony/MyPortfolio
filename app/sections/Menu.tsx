import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import GradientSpheres from "../components/GradientSpheres";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import WorkExperience from "../components/WorkExperience";
import ProjectsSection from "../components/ProjectsSection";
import AwardsSection from "../components/MarqueeAwards";
import TestimonialSlider from "../components/TestimonialSlider";

const Menu = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="testimonials" className="flex-center relative md:p-0 px-5  ">
      <GradientSpheres
        sphere1Class="testimonial-gradient-sphere testimonial-sphere-2"
        sphere2Class="testimonial-gradient-sphere testimonial-sphere-1"
      />

      {/* <div
        className={`absolute inset-0 overflow-auto pt-64 pb-32 px-4 transition-opacity duration-1000 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      > */}
      <div className="px-[5rem] z-10">
        {/* <div className="container mx-auto z-10"> */}
        <div className="grid p-2 grid-cols-1 z-10 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Item 1 */}
          {/* <div className="col-span-1 z-12 md:col-span-2 h-64 px-[3rem] bg-white dark:bg-black dark:text-white flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-[var(--box-shadow-v)] hover:cursor-pointer text-black">
            Anthony Dimojiaku &nbsp; | &nbsp;&nbsp;26 <br /> | B.Sc.
            Mathematics/Statistics | Software Engineering | Full Stack | Data
            Science | DeepLearning <br /> | Artificial Intelligence | Freelance
          </div> */}

          <div
            className="col-span-1 z-12 md:col-span-2 h-64   text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--resume-foreground)",
            }}
          >
            <Link
              href="/about"
              className="w-full h-full px-[3rem] relative flex justify-center items-center  "
            >
              <span
                style={{
                  backgroundColor: "rgba(var(--resume-background-rgb), 0.25)",
                  color: "var(--resume-foreground)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                className="absolute bottom-[4%] left-[2%] px-4 py-2 rounded-full font-medium"
              >
                About
              </span>
              {/* Anthony Dimojiaku &nbsp; | &nbsp;&nbsp;26 <br /> | B.Sc.
            Mathematics/Statistics | Software Engineering | Full Stack | Data
            Science | DeepLearning <br /> | Artificial Intelligence | Freelance */}
              Hi, I'm Anthony. I will partner with you & your team to transform
              complex ideas into clean, user-friendly digital experiences that
              drive results.
            </Link>
          </div>

          {/* Item 2 */}
          <Link href="https://www.google.com/maps/place/Lagos,+Nigeria/@6.5479477,2.9542966,10z/data=!3m1!4b1!4m6!3m5!1s0x103b8b2ae68280c1:0xdc9e87a367c3d9cb!8m2!3d6.5243793!4d3.3792057!16zL20vMGxuZnk?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D">
            <div
              // style={{
              //   backgroundImage: "url('/images/image.png')",
              //   backgroundSize: "cover",
              // }}
              style={{
                backgroundImage: "var(--map-image)",
                backgroundSize: "cover",
              }}
              className="col-span-1 text-black h-64 flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
            >
              <span
                style={{
                  backgroundColor: "rgba(var(--resume-background-rgb), 0.25)",
                  color: "var(--resume-foreground)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                className="px-4 py-2 rounded-full font-medium"
              >
                Lagos, Nigeria
              </span>
            </div>
          </Link>

          {/* Item 3 */}
          <div
            // style={{
            //   backgroundImage: "url('/images/cv-bg.png')",
            //   backgroundSize: "cover",
            // }}
            style={{
              backgroundImage: "var(--resume-image)",
              backgroundSize: "cover",
            }}
            className="col-span-1 text-black md:row-span-2 h-64 md:h-auto flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
          >
            <Link
              href="/resume"
              className="w-full h-full flex justify-center items-center"
            >
              <span
                style={{
                  backgroundColor: "rgba(var(--resume-background-rgb), 0.25)",
                  color: "var(--resume-foreground)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                className="px-4 py-2 rounded-full font-medium"
              >
                Resume
              </span>
            </Link>
          </div>
          {/* Item 4 */}
          <div
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            className="col-span-1 h-64  flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer "
          >
            <ThemeToggle />
          </div>

          {/* Item 5 */}
          <div
            style={{
              backgroundColor: "var(--linkedIn)",
              color: "var(--foreground)",
            }}
            className="col-span-1 h-64 flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] relative"
          >
            {/* Contact */}
            <svg
              className="linkedin-icon"
              width="75.121"
              height="61.052"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M4.98 2.5C4.98 3.881 3.87 5 2.5 5C1.13 5 0.02 3.881 0.02 2.5C0.02 1.12 1.13 0 2.5 0C3.87 0 4.98 1.12 4.98 2.5ZM5 7H0V23H5V7ZM12.982 7H8.014V23H12.983V14.601C12.983 9.931 19.012 9.549 19.012 14.601V23H24V12.869C24 4.989 15.078 5.276 12.982 9.155V7Z"
                fill="white"
              ></path>{" "}
            </svg>
            <Link href="https://www.linkedin.com/in/dimojiaku-anthony">
              <button className=" cursor-pointer absolute bottom-3 left-3 bg-white border-4 border-[var(--arrow-up-right-border)] hover:border-[var(--arrow-up-right-border-hover)] text-white text-sm p-3 rounded-full transition-all duration-300">
                <ArrowUpRight color="black" />
              </button>
            </Link>
          </div>

          {/* Item 6 */}
          <div
            style={{
              backgroundImage: "url('/images/project-bg.png')",
              backgroundSize: "cover",
            }}
            className="col-span-1 md:row-span-2 h-64 md:h-auto  text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
          >
            <Link
              href="/projects"
              className="w-full h-full flex justify-center items-center"
            >
              {/* <span className="z-10 relative top-[-32%] left-[10%] ">Projects</span> */}
              <span
                style={{
                  backgroundColor: "rgba(var(--resume-background-rgb), 0.25)",
                  color: "var(--resume-foreground)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                className="px-4 z-10 relative top-[-32%] left-[10%] py-2 rounded-full font-medium"
              >
                Projects
              </span>
              <ProjectsSection />
            </Link>
          </div>

          {/* Item 7 */}
          {/* <div
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            className="col-span-1 md:col-span-2 h-64  flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
          >
            Experience
          </div> */}
          <WorkExperience />

          {/* Item 8 */}
          <div
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            className="col-span-1 h-64 z-10 flex  justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)]  hover:cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <span
                style={{
                  color: "var(--resume-foreground)",
                }}
              >
                Blog
              </span>
              <span
                style={{
                  backgroundColor: "rgba(var(--resume-background-rgb), 0.25)",
                  color: "var(--resume-foreground)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                className="px-4 py-2 rounded-full font-medium"
              >
                Coming Soon
              </span>
            </div>
          </div>

          {/* Item 9 */}
          <div
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            className="col-span-1 md:col-span-2 h-64 relative flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
          >
            <span
              style={{
                backgroundColor: "rgba(var(--resume-background-rgb), 0.25)",
                color: "var(--resume-foreground)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
              }}
              className="px-4 z-10 absolute bottom-[5%] right-[2.5%] py-2 rounded-full font-medium"
            >
              Testimonials
            </span>
            {/* Testimonials */}
            <TestimonialSlider />
          </div>

          {/* Item 10 */}
          <div
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            className="col-span-1 md:col-span-2 h-64 relative  flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] hover:cursor-pointer"
          >
            <div className="tech-stack-gradient-left-box w-36 h-full absolute rounded-[18px] bottom-0 left-0 z-20"></div>
            <div className="tech-stack-gradient-right-box w-36 h-full absolute rounded-[18px] bottom-0 right-0 z-20"></div>
            {/* Awards */}
            <AwardsSection />
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Menu;
