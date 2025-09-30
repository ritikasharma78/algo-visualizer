import React from "react";
import { FocusCards } from "../ui/focuscards";

export default function Cards() {
  const cardData = [
    {
      title: "Arrays",
      description: "Visualize data storage and traversal techniques.",
      image: "/public/card-banners/arrays.jpg",
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

  return <FocusCards cards={cardData} />;
}
