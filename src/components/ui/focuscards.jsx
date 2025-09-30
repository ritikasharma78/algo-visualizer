"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom"; // ✅ for navigation

// Single Card Component
export const Card = React.memo(({ card, index, hovered, setHovered }) => {
  const navigate = useNavigate(); // ✅ React Router hook

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => card.link && navigate(card.link)} // ✅ navigate on click
      className={cn(
        "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 w-80 text-center text-white shadow-lg transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && "blur-[1.6px] scale-[1.00]",
        hovered === index && "scale-80"
      )}
    >
      {/* Image */}
      <img
        src={card.src || card.image}
        alt={card.title}
        className="w-full h-[200px] mx-auto mb-2 rounded object-cover"
      />

      {/* Title */}
      <h3 className="text-xl font-bold mb-0.5">{card.title}</h3>

      {/* Description */}
      {card.description && (
        <p className="text-gray-300 text-sm">{card.description}</p>
      )}
    </div>
  );
});

Card.displayName = "Card";

// FocusCards Wrapper
export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
