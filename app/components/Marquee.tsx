import React, { useRef, useEffect, useState } from "react";

const MarqueeComponent = ({ children }: { children: React.ReactNode }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Duplicate content to ensure continuous marquee effect
    if (contentRef.current && !isScrolling) {
      const original = contentRef.current.innerHTML;
      contentRef.current.innerHTML = original + original;
    }
  }, [isScrolling]);

  const handleScroll = () => {
    if (!marqueeRef.current) return;

    // When user starts scrolling, disable animation
    if (!isScrolling) {
      setIsScrolling(true);
      if (contentRef.current) {
        contentRef.current.style.animation = "none";
        contentRef.current.style.transform = "none";
      }
    }

    // Clear previous timeout
    //@ts-ignore
    if (window.scrollTimer) {
        //@ts-ignore
      clearTimeout(window.scrollTimer as number);
    }

    // Set a new timeout to detect when scrolling stops
    (window as any).scrollTimer = setTimeout(() => {
      setIsScrolling(false);
      if (contentRef.current) {
        // Reset animation but keep user's scroll position
        contentRef.current.style.animation =
          "marquee-scroll 30s linear infinite";
      }
    }, 1000);
  };

  return (
    <div
      className="marquee overflow-x-auto overflow-y-hidden pt-[1rem] no-scrollbar relative"
      ref={marqueeRef}
      onScroll={handleScroll}
    >
      
      <div
        ref={contentRef}
        className={`marquee-content flex items-center gap-1 ${
          !isScrolling ? "animate-marquee" : ""
        }`}
        style={{ minWidth: "max-content" }}
      >
        {children}
      </div>
    </div>
  );
};

export default MarqueeComponent;
