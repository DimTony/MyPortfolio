"use client"

import { useState, useEffect } from "react";

// Animations defined within the component to make it self-contained
const animationStyles = `
  @keyframes wander-left {
    0% { transform: translate(0, 0); }
    50% { transform: translate(-20%, 30%); }
    100% { transform: translate(0, 0); }
  }
  
  @keyframes wander-right {
    0% { transform: translate(0, 0); }
    50% { transform: translate(20%, -30%); }
    100% { transform: translate(0, 0); }
  }
`;

// Sphere component to generate the gradient spheres
type SphereProps = {
  color: string;
  size: number;
  blur: number;
  position: React.CSSProperties;
  animation?: string | null;
  duration?: number;
  opacity?: number;
};

export const Sphere = ({
  color,
  size,
  blur,
  position,
  animation,
  duration,
  opacity,
}: any) => {
  const style = {
    position: "absolute" as any,
    width: `${size}%`,
    height: `${size}%`,
    borderRadius: "50%",
    filter: `blur(${blur}px)`,
    background: `radial-gradient(circle, ${color}, ${color})`,
    opacity: opacity,
    zIndex: 0,
    pointerEvents: "none" as any,
    ...position,
    animation: animation
      ? `${animation} ${duration}s ease-in-out infinite`
      : "none",
  };

  return <div style={style} />;
};

// ConfinedGradientSpheres component
export const ConfinedGradientSpheres = ({ sphere1, sphere2, className }: any) => {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <Sphere {...sphere1} />
      <Sphere {...sphere2} />
    </div>
  );
};

// Card Component for the demo
export const GradientCard = ({ title, description, sphereConfig, className }: any) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden h-64 bg-white bg-opacity-10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <ConfinedGradientSpheres
        sphere1={sphereConfig.sphere1}
        sphere2={sphereConfig.sphere2}
      />
       {/* <div className="relative z-10 p-6 h-full flex flex-col justify-between">
         <h3 className="text-xl font-medium">{title}</h3>
         <p className="text-sm opacity-80">{description}</p>
       </div> */}
    </div>
  );
};

// Main Demo Component
const GradientSpheresDemo = () => {
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);

    const darkModeListener = (e: any) => {
      setIsDark(e.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", darkModeListener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", darkModeListener);
    };
  }, []);

  // Card configurations
  const cardConfigs = [
    {
      title: "Blue & Mint",
      description: "Classic combination with wander animations",
      sphereConfig: {
        sphere1: {
          color: "#6886c5",
          size: 80,
          blur: 60,
          position: { bottom: "30%", right: "20%" },
          animation: "wander-left",
          duration: 10,
          opacity: 0.7,
        },
        sphere2: {
          color: "#7bd4bc",
          size: 60,
          blur: 50,
          position: { top: "10%", left: "10%" },
          animation: "wander-right",
          duration: 12,
          opacity: 0.7,
        },
      },
    },
    {
      title: "Peach & Blue",
      description: "Softer tones with one static sphere",
      sphereConfig: {
        sphere1: {
          color: "#ffd6aa",
          size: 70,
          blur: 60,
          position: { top: "40%", right: "10%" },
          animation: "wander-right",
          duration: 12,
          opacity: 0.6,
        },
        sphere2: {
          color: "#6886c5",
          size: 60,
          blur: 70,
          position: { bottom: "10%", left: "20%" },
          animation: null,
          opacity: 0.5,
        },
      },
    },
    {
      title: "Purple & Teal",
      description: "Custom colors with opposing animations",
      sphereConfig: {
        sphere1: {
          color: "#9370DB",
          size: 90,
          blur: 80,
          position: { bottom: "20%", left: "20%" },
          animation: "wander-left",
          duration: 15,
          opacity: 0.5,
        },
        sphere2: {
          color: "#20B2AA",
          size: 60,
          blur: 60,
          position: { top: "20%", right: "20%" },
          animation: "wander-right",
          duration: 10,
          opacity: 0.6,
        },
      },
    },
    {
      title: "Pink & Yellow",
      description: "Vibrant colors with small blur radius",
      sphereConfig: {
        sphere1: {
          color: "#FF69B4",
          size: 65,
          blur: 40,
          position: { top: "20%", left: "20%" },
          animation: "wander-right",
          duration: 8,
          opacity: 0.6,
        },
        sphere2: {
          color: "#FFD700",
          size: 70,
          blur: 45,
          position: { bottom: "15%", right: "15%" },
          animation: "wander-left",
          duration: 10,
          opacity: 0.5,
        },
      },
    },
    {
      title: "Dark Blue & Green",
      description: "Deep colors with slow animation",
      sphereConfig: {
        sphere1: {
          color: "#191970",
          size: 75,
          blur: 70,
          position: { top: "25%", left: "25%" },
          animation: "wander-left",
          duration: 20,
          opacity: 0.7,
        },
        sphere2: {
          color: "#006400",
          size: 80,
          blur: 65,
          position: { bottom: "20%", right: "20%" },
          animation: "wander-right",
          duration: 25,
          opacity: 0.6,
        },
      },
    },
    {
      title: "Orange & Cyan",
      description: "Complementary colors for contrast",
      sphereConfig: {
        sphere1: {
          color: "#FF7F50",
          size: 85,
          blur: 75,
          position: { bottom: "30%", left: "20%" },
          animation: "wander-right",
          duration: 12,
          opacity: 0.6,
        },
        sphere2: {
          color: "#00FFFF",
          size: 60,
          blur: 55,
          position: { top: "25%", right: "25%" },
          animation: "wander-left",
          duration: 14,
          opacity: 0.5,
        },
      },
    },
  ];

  return (
    <div
      className={`p-4 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      } min-h-screen transition-colors duration-300`}
    >
      <style>{animationStyles}</style>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Confined Gradient Spheres Demo
        </h1>
        <p className="text-center mb-8 opacity-80">
          Beautiful gradient spheres that stay within their containers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardConfigs.map((config, index) => (
            <GradientCard
              key={index}
              title={config.title}
              description={config.description}
              sphereConfig={config.sphereConfig}
              className="transform transition-transform hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientSpheresDemo;
