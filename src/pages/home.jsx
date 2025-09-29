import React from "react";
import Aurora from "../components/ui/aurora/aurora";

export default function HomePage() {
  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
    </>
  );
}
