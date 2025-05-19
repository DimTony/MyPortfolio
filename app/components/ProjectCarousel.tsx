import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./css/project-carousel.module.css";

const ProjectCarousel = ({ projects }: { projects: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<any>(null);

  // Automatically advance slides every 5 seconds
  useEffect(() => {
    const nextSlide = () => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    timeoutRef.current = setTimeout(nextSlide, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, projects.length]);

  // Handle transition end to reset transition state
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className={styles.carouselContainer}>
      {projects.map((project, index) => {
        // Calculate position based on current index
        const position = index - currentIndex;

        // Apply different styles based on position
        const isActive = position === 0;
        const isPrev =
          position === -1 ||
          (position === projects.length - 1 && currentIndex === 0);
        const isNext =
          position === 1 ||
          (position === -(projects.length - 1) &&
            currentIndex === projects.length - 1);

        // Calculate rotation angles for tilted effect
        const tiltAngle = isActive ? 0 : isPrev ? -15 : isNext ? 15 : 0;

        return (
          <div
            key={project.id}
            className={`
              ${styles.carouselItem}
              ${isActive ? styles.active : ""}
              ${isPrev ? styles.prev : ""}
              ${isNext ? styles.next : ""}
            `}
            style={{
              transform: `
                translateX(${isActive ? 0 : isPrev ? -110 : isNext ? 110 : 0}%)
                translateY(${isActive ? 0 : isPrev ? -10 : isNext ? -10 : 0}%)
                rotate(${tiltAngle}deg)
                scale(${isActive ? 1 : 0.8})
              `,
              zIndex: isActive ? 3 : 1,
              opacity: isActive || isPrev || isNext ? 1 : 0,
              transition: isTransitioning ? "all 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className={`${styles.projectCard} shadow-[var(--box-shadow-v)]`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation dots */}
      {/* <div className={styles.dots}>
        {projects.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ProjectCarousel;
