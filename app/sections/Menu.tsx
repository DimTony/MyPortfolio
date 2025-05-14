import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import GradientSpheres from "../components/GradientSpheres";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "next-themes";

const Menu = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="testimonials" className="flex-center relative md:p-0 px-5">
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
          <div className="col-span-1 z-12 md:col-span-2 h-64 px-[3rem] bg-white dark:bg-black dark:text-white flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer text-black">
            Anthony Dimojiaku &nbsp; | &nbsp;&nbsp;26 <br /> | B.Sc.
            Mathematics/Statistics | Software Engineering | Full Stack | Data
            Science | DeepLearning <br /> | Artificial Intelligence | Freelance
          </div>

          {/* Item 2 */}
          <div
            style={{
              backgroundImage: "url('/images/map-green.png')",
              backgroundSize: "cover",
            }}
            className="col-span-1 text-black h-64 flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer"
          >
            Lagos, Nigeria
          </div>

          {/* Item 3 */}
          <div
            style={{
              backgroundImage: "url('/images/cv-bg.png')",
              backgroundSize: "cover",
            }}
            className="col-span-1 text-black md:row-span-2 h-64 md:h-auto flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer"
          >
            Resume
          </div>

          {/* Item 4 */}
          <div className="col-span-1 h-64 bg-white flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer text-black">
           

            <ThemeToggle />
          </div>

          {/* Item 5 */}
          <div className="col-span-1 h-64 bg-[#6886c5] flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg relative">
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
            <button className="cursor-pointer absolute bottom-3 left-3 bg-white border-4 border-[#6886c5] text-white text-sm p-3 rounded-full hover:border-[#B4C3E2] transition-all duration-300">
              <ArrowUpRight color="black" />
            </button>
          </div>

          {/* Item 6 */}
          <div
            style={{
              backgroundImage: "url('/images/project-bg.png')",
              backgroundSize: "cover",
            }}
            className="col-span-1 md:row-span-2 h-64 md:h-auto flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer"
          >
            Projects
          </div>

          {/* Item 7 */}
          <div className="col-span-1 md:col-span-2 h-64 bg-white text-black flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer">
            Experience
          </div>

          {/* Item 8 */}
          <div className="col-span-1 h-64 bg-black text-white flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer">
            Blog
          </div>

          {/* Item 9 */}
          <div className="col-span-1 md:col-span-2 h-64 bg-white text-black flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer">
            Testimonials
          </div>

          {/* Item 10 */}
          <div className="col-span-1 md:col-span-2 h-64 bg-white text-black flex justify-center items-center text-2xl font-bold rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] hover:shadow-lg hover:cursor-pointer">
            Awards
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Menu;
