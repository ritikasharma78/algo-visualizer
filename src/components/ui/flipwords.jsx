"use client";
import React, { useEffect, useState } from "react";

export function FlipWords({ words, duration = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className="inline-block transition-all duration-500 ease-in-out">
      {words[index]}
    </span>
  );
}
