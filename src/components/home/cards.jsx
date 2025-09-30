import React from "react";

export default function Cards() {
  const cardData = [
    {
      title: "Arrays",
      description: "Visualize data storage and traversal techniques.",
      image: "/public/card-banners/arrays.jpg", // replace with your image path
    },
    {
      title: "Sorting",
      description: "Visualize Bubble, Merge, Quick Sort, and more.",
      image: "/public/card-banners/sorting.jpg",
    },
    {
      title: "Dijkstra",
      description: "Explore shortest path algorithms.",
      image: "/public/card-banners/pathfinder.jpg",
    },
  ];

  return (
    <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2  w-80 text-center text-white shadow-lg hover:scale-105 transition-transform"
        >
          {/* Image */}
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-[200px] mx-auto mb-2 rounded object-cover"
          />

          {/* Title */}
          <h3 className="text-xl font-bold mb-0.5">{card.title}</h3>

          {/* Description */}
          <p className="text-gray-300 text-sm">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
