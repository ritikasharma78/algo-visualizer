import React from "react";
import Aurora from "../components/ui/aurora/aurora";
import TrueFocus from "../components/ui/true-focus/truefocustext";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#ED66FF", "#B19EEF", "#5227FF"]}
        blend={0.4}
        amplitude={0.8}
        speed={0.5}
      />

      {/* Navbar */}
      <nav className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[60%] p-3 flex items-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 z-40">
        {/* Navigation Links evenly spaced */}
        <ul className="flex flex-1 justify-around text-white">
          <li className="hover:text-yellow-400 cursor-pointer font-semibold transition">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer font-semibold transition">Features</li>
          <li className="hover:text-yellow-400 cursor-pointer font-semibold transition">About</li>
          <li className="hover:text-yellow-400 cursor-pointer font-semibold transition">Contact</li>
        </ul>
      </nav>

      {/* TrueFocus Text + Description */}
      <div className="absolute top-1/3 w-full -mt-16 flex flex-col items-center z-10">
        {/* Force TrueFocus in a block container */}
        <div className="w-full flex justify-center">
          <TrueFocus
            sentence="Algorithm Visualizer"
            manualMode={false}
            blurAmount={1.9}
            borderColor="yellow"
            animationDuration={2}
            pauseBetweenAnimations={2}
          />
        </div>

        {/* Description below */}
        <p className="mt-3 text-center text-gray-400 text-lg font-semibold max-w-xl px-4">
          Explore, visualize, and interact with algorithms.
        </p>
      </div>
    </div>
  );
}
