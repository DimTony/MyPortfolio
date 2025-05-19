import React, { useRef, useEffect, useState } from "react";

// Award type definition
interface Award {
  id: string;
  title: string;
  issuer?: string;
  year?: number;
  description?: string;
  icon?: string; // URL or component name
}

// Props for the MarqueeAwards component
interface MarqueeAwardsProps {
  awards: Award[];
  speed?: number; // Speed of the marquee (lower is faster)
  direction?: "left" | "right";
  gap?: number; // Gap between awards in pixels
  pauseOnHover?: boolean;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  height?: string; // Custom height for the container
}

const MarqueeAwards = ({
  awards,
  speed = 30,
  direction = "left",
  gap = 40,
  pauseOnHover = true,
  className = "",
  backgroundColor = "bg-black",
  textColor = "text-white",
  height = "h-36",
}: MarqueeAwardsProps) => {
  const [duplicatedAwards, setDuplicatedAwards] = useState<Award[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Calculate how many copies of the award list we need to create a seamless loop
  useEffect(() => {
    if (!containerRef.current) return;

    const calculateDuplicates = () => {
      const containerWidth = containerRef.current?.clientWidth || 0;
      // Each award card has a min-width of 192px (min-w-48) plus gaps
      const itemWidth = 192 + gap;
      const visibleItems = Math.ceil(containerWidth / itemWidth);

      // We need at least 2 complete sets to ensure smooth looping
      const minRequiredItems = visibleItems * 2;
      const duplicateCount = Math.ceil(minRequiredItems / awards.length);

      let duplicated: Award[] = [];
      for (let i = 0; i < duplicateCount; i++) {
        duplicated = [
          ...duplicated,
          ...awards.map((award) => ({ ...award, id: `${award.id}-${i}` })),
        ];
      }

      setDuplicatedAwards(duplicated);
    };

    calculateDuplicates();

    // Recalculate on window resize
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, [awards, gap]);

  // Update animation when content changes
  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    // Get the actual width of a single set of awards
    const singleSetWidth =
      (scrollerRef.current.scrollWidth / duplicatedAwards.length) *
      awards.length;
    setScrollWidth(singleSetWidth);

    // Calculate animation duration based on content length and speed
    const animationDuration = singleSetWidth / speed;

    // Apply animation
    scrollerRef.current.style.animationDuration = `${animationDuration}s`;
    scrollerRef.current.style.animationDirection =
      direction === "right" ? "reverse" : "normal";
    scrollerRef.current.style.animationPlayState =
      isHovering && pauseOnHover ? "paused" : "running";
  }, [
    duplicatedAwards,
    speed,
    direction,
    isHovering,
    pauseOnHover,
    awards.length,
  ]);

  // Award card component
  const AwardCard = ({ award }: { award: Award }) => (
    <div className="" style={{ marginRight: `${gap}px` }}>
      {award.icon && (
        <div className="mb-1">
          {typeof award.icon === "string" ? (
            <img src={award.icon} alt="" />
          ) : (
            award.icon
          )}
        </div>
      )}
      <span className="font-[300] text-[12px] whitespace-nowrap ">
        {award.issuer}
      </span>
      <p className="text-xs opacity-70">{award.title}</p>
      {/* <div className="text-center">
        <h3 className="font-bold text-base">{award.title}</h3>
        {award.issuer && <p className="text-xs opacity-80">{award.issuer}</p>}
        {award.year && <p className="text-xs opacity-70">{award.year}</p>}
      </div> */}
    </div>
  );

  return (
    <div
      className={`overflow-hidden w-full ${height} ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={scrollerRef}
        className="flex items-center h-full"
        style={{
          // Replace the shorthand animation property with individual properties
          animationName: scrollWidth > 0 ? "marquee" : "none",
          animationDuration: scrollWidth > 0 ? `${scrollWidth / speed}s` : "0s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isHovering && pauseOnHover ? "paused" : "running",
        }}
      >
        {duplicatedAwards.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>

      {/* CSS for the marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${scrollWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

// Example usage in a page component
const AwardsSection = () => {
  // Example awards data
  const myAwards: Award[] = [
    {
      id: "1",
      title: "IT Service Management",
      issuer: "ITIL v4 Certificied",
      year: 2024,
      description: "Recognized for outstanding portfolio design",
      icon: "/images/itil.png", // Replace with your actual icon path
    },
    {
      id: "2",
      title: "Azure Fundamentals",
      issuer: "Microsoft Certified",
      year: 2024,
      description: "Recognized for outstanding portfolio design",
      icon: "/images/az900.png", // Replace with your actual icon path
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 w-full overflow-hidden">
        <MarqueeAwards
          awards={myAwards}
          speed={25}
          backgroundColor="bg-gradient-to-r from-indigo-500 to-purple-600"
          textColor="text-white"
          height="h-full"
          className="rounded-xl"
        />
      </div>
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
        className="px-4 w-fit z-20 relative top-[-5%] left-[2.5%] py-2 rounded-full font-medium"
      >
        Certificates
      </span>
    </div>
  );
};

export default AwardsSection;
