import { useState, useEffect, useRef } from "react";

const WorkExperience = () => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [topScrollPosition, setTopScrollPosition] = useState(0); // Track actual scroll position

  // Auto-scroll effect
  useEffect(() => {
    if (!isHovering && scrollRef.current) {
      //@ts-ignore
      const scrollHeight = scrollRef.current.scrollHeight;
      //@ts-ignore
      const height = scrollRef.current.clientHeight;

      const scrollInterval = setInterval(() => {
        setScrollPosition((prevPos) => {
          const newPosition = prevPos + 0.5; // Adjust speed here
          // Reset when reaching the bottom
          if (newPosition >= scrollHeight - height) {
            return 0;
          }
          return newPosition;
        });
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [isHovering]);

  // Update scroll position
  useEffect(() => {
    if (scrollRef.current) {
      //@ts-ignore
      scrollRef.current.scrollTop = scrollPosition;
      setTopScrollPosition(scrollPosition); // Update the tracked position
    }
  }, [scrollPosition]);

  // Handle manual scrolling
  const handleScroll = (e: any) => {
    if (isHovering) {
      setTopScrollPosition(e.target.scrollTop);
    }
  };

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "Jan 2023 - Present",
      description:
        "Led development of responsive web applications using Next.js. Implemented complex UI components and optimized performance.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "Mar 2021 - Dec 2022",
      description:
        "Developed and maintained full-stack applications using React and Node.js. Collaborated with design teams to implement UI/UX improvements.",
    },
    {
      title: "Web Developer",
      company: "Creative Web Agency",
      period: "Jun 2019 - Feb 2021",
      description:
        "Created client websites and implemented responsive designs. Worked with WordPress and custom JavaScript solutions.",
    },
    {
      title: "Junior Developer",
      company: "StartUp Ventures",
      period: "Sep 2018 - May 2019",
      description:
        "Assisted senior developers with frontend tasks. Learned and implemented modern web development practices.",
    },
  ];

  // Calculate gradient opacity based on scroll position
  const gradientOpacity = Math.min(topScrollPosition / 30, 1);

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      className="col-span-1 md:col-span-2 h-64 rounded-3xl transition-transform duration-300 ease-in hover:translate-y-[-5px] shadow-[var(--box-shadow-v)] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-fit p-4 rounded-br-[12px] border-gray-200 dark:border-gray-700 bg-opacity-90 backdrop-blur-sm">
        {/* <h2 className="text-2xl font-bold text-center">Experience</h2> */}
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
          className="px-4 w-fit z-20 relative top-[5%] left-[5%] py-2 rounded-full font-medium"
        >
          Experience
        </span>
      </div>

      <div className="relative h-[calc(100%-60px)]">
        {/* Top gradient fade overlay - adapts to light/dark mode */}
        <div
          className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none gradient-overlay transition-opacity duration-300"
          style={{ opacity: gradientOpacity }}
        />

        <style jsx>{`
          /* Gradient overlay for light/dark mode */
          .gradient-overlay {
            background: var(--experience-lin-g-bg);
            transition: opacity 0.3s ease;
          }
        `}</style>

        <div
          ref={scrollRef}
          className="custom-scrollbar overflow-y-auto h-full px-4 py-2"
          style={{ scrollBehavior: "smooth" }}
          onScroll={handleScroll}
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="mb-6 last:mb-2 transition-all duration-200 hover:bg-opacity-10 hover:bg-gray-500 p-3 rounded-lg"
            >
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "var(--resume-foreground)",
                }}
              >
                {exp.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                  className="text-sm font-medium"
                >
                  {exp.company}
                </span>
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  {exp.period}
                </span>
              </div>
              <p
                style={{
                  color: "var(--resume-foreground)",
                }}
                className="mt-2 text-sm"
              >
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
