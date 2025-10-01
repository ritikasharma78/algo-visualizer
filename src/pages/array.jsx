import React from "react";
import  motion from "framer-motion";

export default function ArrayPage() {
  // Fade-in + slide-up animation
  const fadeSlideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[linear-gradient(to_bottom,_black_0%,_black_50%,_rgb(70,40,120)_90%,_#7A6098_100%)]">
      {/* Main container wrapping both sections */}
      <div className="flex items-start space-x-6 ">
        {/* Left visualization area */}
        <motion.div
          className="flex flex-col items-center p-4 bg-[#26252A] rounded-md h-[90vh] w-[64vw] shadow-lg"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-bold text-gray-200 mb-4">Arrays</h2>
          <div className="flex-1 w-full border-2 bg-white border-gray-400 rounded-md">
            {/* Main visualization area */}
          </div>
        </motion.div>

        {/* Right operations panel */}
        <motion.div
          className="bg-[#26252A] rounded-md shadow-lg h-[90vh] w-[20vw] p-6 flex flex-col space-y-4"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }} // slight delay for stagger effect
        >
          <h2 className="text-xl font-bold text-gray-200 -mb-2 text-center">
            Operations
          </h2>

          {/* Create section */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-md font-semibold text-gray-200">Create</h3>
            <div className="flex items-center space-x-2">
              <button className="bg-[#50338e] hover:bg-[#7c52d6] text-white py-1 px-2 rounded-md transition flex-1 text-sm">
                User Input
              </button>
              <button className="bg-[#50338e] hover:bg-[#7c52d6] text-white py-1 px-2 rounded-md transition flex-1 text-sm">
                Random
              </button>
            </div>
          </div>

          {/* Insert section */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-md font-semibold text-gray-200">Insert</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Value"
                className="w-1/3 p-1 text-sm border bg-[#3a393f] border-none rounded-md"
              />
              <input
                type="number"
                placeholder="Index"
                className="w-1/3 p-1 text-sm border bg-[#3a393f] border-none rounded-md"
              />
              <button className="bg-[#50338e] hover:bg-[#7c52d6] text-white py-1 px-2 rounded-md transition text-sm flex-1">
                Insert
              </button>
            </div>
          </div>

          {/* Delete section */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-md font-semibold text-gray-200">Delete</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Index"
                className="w-1/2 p-1 text-sm  bg-[#3a393f] border-none rounded-md"
              />
              <button className="bg-[#50338e]  hover:bg-[#7c52d6] text-white py-1 px-2 rounded-md transition text-sm flex-1">
                By Index
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Value"
                className="w-1/2 p-1 text-sm bg-[#3a393f] border-none rounded-md"
              />
              <button className="bg-[#50338e] hover:bg-[#7c52d6] text-white py-1 px-2 rounded-md transition text-sm flex-1">
                By Value
              </button>
            </div>
          </div>

          {/* Update section */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-md font-semibold text-gray-200">Update</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Index"
                className="w-1/3 p-1 text-sm bg-[#3a393f] border-none rounded-md"
              />
              <input
                type="number"
                placeholder="Value"
                className="w-1/3 p-1 text-sm bg-[#3a393f] border-none rounded-md"
              />
              <button className="bg-[#50338e] hover:bg-[#7c52d6] text-white py-1 px-2 rounded-md transition text-sm flex-1">
                Update
              </button>
            </div>
          </div>

          {/* Controls section */}
          <div className="flex flex-col space-y-2 mt-4">
            <h3 className="text-md font-semibold text-gray-200">Controls</h3>
            <div className="flex items-center space-x-2">
              <button className="bg-[#50338e] hover:bg-[#7c52d6] text-white py-1 px-4 rounded-md transition text-sm">
                Reverse
              </button>
              <div className="flex items-center space-x-2 flex-1">
                <label className="text-sm text-gray-200">Speed</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
