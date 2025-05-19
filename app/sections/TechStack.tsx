import TechIcon from "../components/TechIcon";
import TitleHeader from "../components/TitleHeader";
import { iconsList } from "../constants";

const TechStack = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full md:mt-40 mt-20">
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="TECH STACK"
            number="'25"
            text="My Go-To Tools for Crafting Solutions"
          />
        </div>
        <div className="md:mt-20 mt-10 relative">
          <div className="tech-stack-gradient-left-box w-36 h-full absolute bottom-0 left-0 z-20"></div>
          <div className="tech-stack-gradient-right-box w-36 h-full absolute bottom-0 right-0 z-20"></div>

          {/* Updated marquee with better animation control */}
          <div className="marquee h-52 overflow-hidden pt-[1rem] ">
            <div className="marquee-content flex items-center gap-5 md:gap-12 animate-marquee">
              {/* First copy of the icons */}
              {iconsList.map((icon, index) => (
                <TechIcon key={`first-${index}`} icon={icon} />
              ))}

              {/* Second copy of the icons to create a seamless loop */}
              {iconsList.map((icon, index) => (
                <TechIcon key={`second-${index}`} icon={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
