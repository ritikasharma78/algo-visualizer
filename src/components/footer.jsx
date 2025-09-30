import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-20 py-6 bg-white/10 backdrop-blur-md  border-white/20 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        
        {/* Left Section */}
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Algorithm Visualizer. All rights reserved.
        </p>

        {/* Center Links */}
        <div className="flex gap-6 text-sm">
          <a href="#features" className="hover:text-yellow-400 transition">Features</a>
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
        </div>

        {/* Right Section (Socials) */}
        <div className="flex gap-4">
          <a href="#" aria-label="GitHub" className="hover:text-yellow-400 transition">
            <i className="fab fa-github text-lg"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-yellow-400 transition">
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-yellow-400 transition">
            <i className="fab fa-linkedin text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
