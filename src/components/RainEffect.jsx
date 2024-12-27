import { useEffect, useState } from "react";
import RainColumn from "./RainColumn";

const RainEffect = () => {
  const [gridSize, setGridSize] = useState(calculateGridSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setGridSize(calculateGridSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function calculateGridSize(width) {
    // Adjust the number of columns based on screen width
    if (width >= 1280) return 30; // Large screens
    if (width >= 1024) return 24; // Medium screens
    if (width >= 768) return 16; // Small screens
    return 12; // Extra small screens
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: "60%",
          height: "100vh",
          aspectRatio: "1",
          minWidth:"768px"
        }}
      >
        {Array.from({ length: gridSize }).map((_, colIndex) => (
          <RainColumn key={colIndex} gridSize={gridSize} colIndex={colIndex} />
        ))}
      </div>
    </div>
  );
};

export default RainEffect;
