"use client";

import React, { ReactNode } from "react";

// Types for the component props
interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  sphere1?: any;
  sphere2?: any;
}

const Sphere = ({ 
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
  

const Card: React.FC<GlassmorphismCardProps> = ({
  children,
  className = "",
  sphere1 = {
    color: "#6886c5",
    size: 80,
    blur: 60,
    position: { bottom: "30%", right: "20%" },
    animation: "wander-left",
    duration: 10,
    opacity: 0.7,
  },
  sphere2 = {
    color: "#7bd4bc",
    size: 60,
    blur: 50,
    position: { top: "10%", left: "10%" },
    animation: "wander-right",
    duration: 12,
    opacity: 0.7,
  },
}) => {
  return (
    <div
    style={{
        backgroundColor: 'var(--background)'
    }}
    className={`${className} relative overflow-hidden rounded-[8px]  bg-opacity-10 backdrop-blur-sm dark:border-gray-700`}>
      <Sphere {...sphere1} />
      <Sphere {...sphere2} />
      {children}
    </div>
    //   <div className="relative z-10 backdrop-blur-md dark:backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-xl shadow-lg p-6">
    //     {children}
    //   </div>
  );
};

export default Card;
