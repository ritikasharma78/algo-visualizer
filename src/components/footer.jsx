import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-20 py-8 bg-black text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* GitHub */}
          <a 
            href="https://github.com/ManasPG" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-400 transition-colors"
          >
            <img 
              src="/icons/github.png" 
              alt="GitHub" 
              className="w-6 h-6"
            />
            <span className="text-sm font-medium">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/ritikasharma11" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-400 transition-colors"
          >
            <img 
              src="/icons/linkedin.png" 
              alt="LinkedIn" 
              className="w-6 h-6"
            />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:sharma.ritika0504@email.com" 
            className="flex items-center gap-2 hover:text-gray-400 transition-colors"
          >
            <img 
              src="/icons/email.png" 
              alt="Email" 
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}