import React from "react";
import Aurora from "../components/ui/aurora/aurora";
import TrueFocus from "../components/ui/true-focus/truefocustext";
export default function HomePage() {
  return (
    <>
      <Aurora
        colorStops={["#ED66FF", "#B19EEF", "#5227FF"]}
        blend={0.4}
        amplitude={0.8}
        speed={0.5}
      />

      <TrueFocus 
sentence="Algorithm Visualizer"
manualMode={false}
blurAmount={1.9}
borderColor="yellow"
animationDuration={2}
pauseBetweenAnimations={1}
/>
      {/* <div>xys</div> */}
    </>
  );
}
