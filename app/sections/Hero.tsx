import { useEffect, useState } from "react";
import GradientSpheres from "../components/GradientSpheres";
import HeroExperience from "../components/HeroExperience";
import Image from "next/image";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="w-screen h-dvh overflow-hidden relative text-white-50 md:p-0 px-5"
    >
      <div className="gradient-box w-full h-96 absolute bottom-0 left-0 z-20"></div>
      <GradientSpheres
        sphere1Class="gradient-sphere sphere-1"
        sphere2Class="gradient-sphere sphere-2"
      />

      <div className="w-full h-full flex-center">
        <div className="container relative w-full h-full">
          <div className="md:mt-40 mt-20">
            <p
              style={{
                // backgroundColor: "var(--background)",
                color: "var(--resume-foreground)",
              }}
              className="font md:text-2xl text-base"
            >
              👋 Hi there!
            </p>
            <h1
              style={{
                // backgroundColor: "var(--background)",
                color: "var(--resume-foreground)",
              }}
              className="font-bold md:text-8xl text-4xl"
            >
              ANTHONY DIMOJIAKU
            </h1>
            <h1
              className="font-bold md:text-9xl text-5xl"
              style={{
                // backgroundColor: "var(--background)",
                color: "var(--resume-foreground)",
              }}
            >
              SOFTWARE
            </h1>
          </div>
          <div className="absolute w-full z-30 bottom-20 right-0">
            <div className="flex justify-between items-end">
              <div className="flex flex-col items-center md:gap-5 gap-1">
                <p
                  className="md:text-base text-xs"
                  style={{
                    // backgroundColor: "var(--background)",
                    color: "var(--resume-foreground)",
                  }}
                >
                  Explore
                </p>
                <Image
                  src="images/arrowdown.svg"
                  alt="arrowdown"
                  className="size-7 animate-bounce"
                  width={10}
                  height={10}
                />
              </div>
              <div className="flex flex-col items-end">
                {/* <img src="/images/logoo.svg" alt="shape" /> */}
                <h1
                  className="font-bold md:text-9xl text-5xl"
                  style={{
                    // backgroundColor: "var(--background)",
                    color: "var(--resume-foreground)",
                  }}
                >
                  ENGINEER
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute top-0 left-0">
        <HeroExperience />
      </div>
      
    </section>
  );
};

export default Hero;
