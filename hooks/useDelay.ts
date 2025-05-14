"use client";

import { useState, useEffect } from "react";

export const useDelay = (delay: number) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isReady;
};
