import React from "react";
import { FocusCards } from "../ui/focuscards";

export default function Cards() {
  const cardData = [
    {
      title: "Arrays",
      description: "Visualize data storage and traversal techniques.",
      image: "/public/card-banners/arrays.jpg",
      link:"/arrays",
    },
    {
      title: "Sorting",
      description: "Visualize Bubble, Merge, Quick Sort, and more.",
      image: "/public/card-banners/sorting.jpg",
      link:"/sorting",
    },
    {
      title: "Dijkstra",
      description: "Explore shortest path algorithms.",
      image: "/public/card-banners/pathfinder.jpg",
      link:"/dijkstra",
    },
    {
      title: "Searching",
      description: "Coming soon.",
      image: "/public/card-banners/pathfinder.jpg",
      link:"/searching",
    },
  ];

  return <FocusCards cards={cardData} />;
}
