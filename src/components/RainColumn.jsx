import { useEffect, useState } from "react";

const RainColumn = ({ gridSize, colIndex }) => {
  const [rainDrops, setRainDrops] = useState([]);
  const [currentColor, setCurrentColor] = useState([0, 0, 255]);
  const [nextColor, setNextColor] = useState([128, 0, 128]); 

  const colorPalette = [
    [0, 0, 255], // Blue
    [128, 0, 128], // Purple
    [255, 0, 255], // Pink
    [255, 0, 0], // Red
    [255, 165, 0], // Orange
    [255, 255, 0], // Yellow
  ];

  useEffect(() => {
    const dropInterval = Math.floor(Math.random() * 50) + 25;

    const fallInterval = setInterval(() => {
      setRainDrops((prevRainDrops) => {
        let newRainDrops = [...prevRainDrops];
        if (
          newRainDrops.length === 0 ||
          newRainDrops.every((drop) => drop >= gridSize)
        ) {
          const numDrops = Math.floor(Math.random() * 4) + 5; // Random group size (5 to 8 drops)
          const randomOffset = Math.floor(Math.random() * gridSize / 2);
          newRainDrops = Array.from(
            { length: numDrops },
            (_, i) => -i - randomOffset
          );
        } else {
          newRainDrops = newRainDrops.map((drop) => drop + 1);
        }
        return newRainDrops;
      });
    }, dropInterval);

    return () => clearInterval(fallInterval);
  }, [gridSize]);

  useEffect(() => {
    const colorTransitionInterval = setInterval(() => {
      setCurrentColor((prevColor) => {
        const [r1, g1, b1] = prevColor;
        const [r2, g2, b2] = nextColor;

        const smoothStep = (start, end) =>
          start + Math.sign(end - start) * Math.min(5, Math.abs(end - start));

        const newColor = [
          smoothStep(r1, r2),
          smoothStep(g1, g2),
          smoothStep(b1, b2),
        ];

        if (
          newColor[0] === r2 &&
          newColor[1] === g2 &&
          newColor[2] === b2
        ) {
          const currentIndex = colorPalette.findIndex(
            ([r, g, b]) => r === r2 && g === g2 && b === b2
          );
          const nextIndex = (currentIndex + 1) % colorPalette.length;
          setNextColor(colorPalette[nextIndex]);
        }

        return newColor;
      });
    }, 50);

    return () => clearInterval(colorTransitionInterval);
  }, [nextColor]);

  const calculateColor = (index, totalDrops) => {
    const intensity = 1 - index / totalDrops; // Higher cells are faded
    return `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${intensity.toFixed(
      2
    )})`;
  };

  // Add depth effect using opacity and z-index alternation
  const depthOpacity = colIndex % 2 === 0 ? 0.8 : 1;
  const depthZIndex = colIndex % 2 === 0 ? 0 : 1;

  return (
    <div
      className="grid gap-1"
      style={{
        opacity: depthOpacity,
        zIndex: depthZIndex,
        transform: depthZIndex === 1 ? "scale(1.05)" : "scale(1)", // Closer columns are slightly larger
      }}
    >
      {Array.from({ length: gridSize }).map((_, rowIndex) => {
        const isActive = rainDrops.includes(rowIndex);
        const cellIndex = rainDrops.indexOf(rowIndex);
        const color =
          cellIndex >= 0
            ? calculateColor(cellIndex, rainDrops.length)
            : "transparent";

        return (
          <div
            key={rowIndex}
            className="w-full h-full border border-gray-800"
            style={{
              backgroundColor: color,
              transition: "background-color 0.2s",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default RainColumn;
