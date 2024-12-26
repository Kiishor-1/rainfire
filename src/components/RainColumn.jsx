import { useEffect, useState } from "react";

const RainColumn = ({ gridSize }) => {
  const [rainDrops, setRainDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRainDrops((prevRainDrops) => {
        let newRainDrops = [...prevRainDrops];
        if (
          newRainDrops.length === 0 ||
          newRainDrops.every((drop) => drop >= gridSize)
        ) {
          const numDrops = Math.floor(Math.random() * 7) + 1;
          newRainDrops = Array.from({ length: numDrops }, (_, i) => -i - 1);
        } else {
          newRainDrops = newRainDrops.map((drop) => drop + 1);
        }

        return newRainDrops;
      });
    }, Math.random() * 40 + 50);

    return () => clearInterval(interval);
  }, [gridSize]);

  const calculateColor = (index, totalDrops) => {
    const intensity = 1 - index / totalDrops; // Higher cells are faded
    return `rgba(255, 0, 0, ${intensity})`; // Gradient from red
  };

  return (
    <div className="grid gap-1">
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