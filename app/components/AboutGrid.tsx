"use client"

import React, { useState, useEffect } from "react";

// Sphere component that travels across the entire grid with graceful movement
const Sphere = ({
  color,
  size,
  blur,
  opacity,
  animationPath,
  duration,
  delay = 0,
}: any) => {
  // Use state to track the sphere's position
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Animation function with smooth interpolation
    const animate = () => {
      let startTime: any = null;
      let animationFrameId: any;

      const step = (timestamp: any) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime + delay * 1000;
        const rawProgress = (elapsed % (duration * 1000)) / (duration * 1000);

        // Apply easing function for smoother motion (ease-in-out cubic)
        const progress = easeInOutCubic(rawProgress);

        // Get exact position with interpolation between points
        const exactPosition = getInterpolatedPosition(animationPath, progress);

        setPosition(exactPosition);
        animationFrameId = requestAnimationFrame(step);
      };

      // Easing function for more natural movement
      const easeInOutCubic = (t: any) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      // Get interpolated position between points
      const getInterpolatedPosition = (path: any, progress: any) => {
        if (path.length === 0) return { top: 0, left: 0 };

        const totalPoints = path.length;
        const exactIndex = progress * (totalPoints - 1);
        const lowerIndex = Math.floor(exactIndex);
        const upperIndex = Math.min(lowerIndex + 1, totalPoints - 1);
        const indexProgress = exactIndex - lowerIndex;

        // Smooth interpolation between points
        const lowerPoint = path[lowerIndex];
        const upperPoint = path[upperIndex];

        return {
          top:
            lowerPoint.top + (upperPoint.top - lowerPoint.top) * indexProgress,
          left:
            lowerPoint.left +
            (upperPoint.left - lowerPoint.left) * indexProgress,
        };
      };

      animationFrameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrameId);
    };

    const cleanup = animate();
    return cleanup;
  }, [animationPath, duration, delay]);

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle, ${color}, ${color})`,
        opacity: opacity,
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    />
  );
};

// Modified Card component with better content styling
const Card = ({ children, className = "" }: any) => {
  return (
    <div
      className={`${className} relative overflow-hidden rounded-lg bg-black/30 bg-opacity-10 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 h-64`}
    >
      <div className="relative z-20 h-full p-4 overflow-y-auto">{children}</div>
    </div>
  );
};

// DimensionalGrid component that contains cards and traveling spheres
const DimensionalGrid = () => {
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });
  const [cardPositions, setCardPositions] = useState<any[]>([]);
  const gridRef = React.useRef<any>(null);

  // Calculate grid dimensions and card positions
  useEffect(() => {
    if (gridRef.current) {
      const updateDimensions = () => {
        const gridRect = gridRef?.current?.getBoundingClientRect();
        setGridDimensions({
          width: gridRect.width,
          height: gridRect.height,
        });

        // Get positions of all cards
        const cardElements = gridRef.current.querySelectorAll(".grid-card");
        const positions = Array.from(cardElements).map((card: any) => {
          const rect = card?.getBoundingClientRect();
          return {
            top: rect.top - gridRect.top,
            left: rect.left - gridRect.left,
            width: rect.width,
            height: rect.height,
            centerTop: rect.top - gridRect.top + rect.height / 2,
            centerLeft: rect.left - gridRect.left + rect.width / 2,
          };
        });

        setCardPositions(positions);
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  // Create animation paths that travel through all cards
  const generatePath = (cardPositions: any) => {
    if (cardPositions.length === 0) return [];

    const path = [];
    const steps = 100; // Number of steps in the animation

    // Create a path through all card centers
    for (let i = 0; i < steps; i++) {
      const cardIndex = i % cardPositions.length;
      const nextCardIndex = (i + 1) % cardPositions.length;

      const currentCard = cardPositions[cardIndex];
      const nextCard = cardPositions[nextCardIndex];

      const progress = (i % 1) * 100;

      // Interpolate between current and next card
      const top =
        currentCard.centerTop +
        (nextCard.centerTop - currentCard.centerTop) * (progress / 100);
      const left =
        currentCard.centerLeft +
        (nextCard.centerLeft - currentCard.centerLeft) * (progress / 100);

      path.push({ top, left });
    }

    return path;
  };

  // Generate a smooth, flowing path through all cards
  const generateFlowingPath = () => {
    if (cardPositions.length === 0) return [];

    const path = [];
    const totalPoints = 500; // More points for smoother movement

    // Create a flowing path that gracefully moves between cards

    // First, create anchor points at each card's center
    const anchors = cardPositions.map((card) => ({
      top: card.top + card.height / 2,
      left: card.left + card.width / 2,
    }));

    // Add some additional anchor points for more interesting paths
    for (let i = 0; i < 4; i++) {
      anchors.push({
        top: Math.random() * gridDimensions.height,
        left: Math.random() * gridDimensions.width,
      });
    }

    // Sort anchors to create a continuous path
    anchors.sort((a, b) => {
      // Create a spiral-like sorting by combining distance from center with angle
      const centerX = gridDimensions.width / 2;
      const centerY = gridDimensions.height / 2;

      const angleA = Math.atan2(a.top - centerY, a.left - centerX);
      const angleB = Math.atan2(b.top - centerY, b.left - centerX);

      return angleA - angleB;
    });

    // Create a smooth path by interpolating between anchors
    for (let i = 0; i < totalPoints; i++) {
      const progress = i / totalPoints;

      // Calculate which segment we're in and how far along it
      const segmentCount = anchors.length;
      const totalLength = segmentCount + 0.999; // Make it cycle
      const position = progress * totalLength;
      const segmentIndex = Math.floor(position);
      const segmentProgress = position - segmentIndex;

      // Get current and next anchor points (with wraparound)
      const currentAnchor = anchors[segmentIndex % segmentCount];
      const nextAnchor = anchors[(segmentIndex + 1) % segmentCount];

      // Apply a sinusoidal variation for more organic movement
      const variationX = Math.sin(progress * Math.PI * 8) * 20;
      const variationY = Math.cos(progress * Math.PI * 6) * 20;

      // Interpolate between anchors with easing and variation
      const t = easeInOutQuad(segmentProgress);
      const point = {
        top:
          currentAnchor.top +
          (nextAnchor.top - currentAnchor.top) * t +
          variationY,
        left:
          currentAnchor.left +
          (nextAnchor.left - currentAnchor.left) * t +
          variationX,
      };

      path.push(point);
    }

    return path;
  };

  // Easing function for smoother transitions
  const easeInOutQuad = (t: any) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Define some interesting sphere configurations with more natural movement
  const spheres = [
    {
      color: "#6886c5",
      size: 100,
      blur: 60,
      opacity: 0.6,
      duration: 60, // Slower for more graceful movement
      delay: 0,
    },
    {
      color: "#7bd4bc",
      size: 80,
      blur: 50,
      opacity: 0.5,
      duration: 75,
      delay: 10,
    },
    {
      color: "#f5b461",
      size: 70,
      blur: 40,
      opacity: 0.4,
      duration: 90,
      delay: 25,
    },
    {
      color: "#ec7272",
      size: 50,
      blur: 35,
      opacity: 0.3,
      duration: 65,
      delay: 30,
    },
  ];

  const path1 = generateFlowingPath();
  const path2 = generateFlowingPath();
  const path3 = generateFlowingPath();
  const path4 = generateFlowingPath();

  return (
    <div className="w-full p-6">
      <div
        ref={gridRef}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden"
      >
        {/* Traveling spheres */}
        {path1.length > 0 && (
          <>
            <Sphere {...spheres[0]} animationPath={path1} />
            <Sphere {...spheres[1]} animationPath={path2} />
            <Sphere {...spheres[2]} animationPath={path3} />
            <Sphere {...spheres[3]} animationPath={path4} />
          </>
        )}

        {/* Grid of cards containing work experiences */}
        {[
          {
            title: "Your Job Title",
            company: "Your Company",
            period: "Start Date - End Date",
            description: "Description of your role and achievements",
            skills: ["Skill 1", "Skill 2", "Skill 3"],
          },
          {
            title: "Your Job Title",
            company: "Your Company",
            period: "Start Date - End Date",
            description: "Description of your role and achievements",
            skills: ["Skill 1", "Skill 2", "Skill 3"],
          },
          // Add more experiences...
        ].map((experience: any, index: any) => (
          <Card key={index} className="grid-card">
            <div className="flex flex-col h-full text-white overflow-y-auto">
              <div className="text-xl font-bold mb-1">{experience.title}</div>
              <div className="text-lg font-semibold text-blue-300 mb-1">
                {experience.company}
              </div>
              <div className="text-sm opacity-80 mb-2">{experience.period}</div>
              <div className="text-sm mb-3">{experience.description}</div>
              {experience.skills && (
                <div className="mt-auto">
                  <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.skills.map((skill: any, idx: any) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-white/10 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DimensionalGrid;
