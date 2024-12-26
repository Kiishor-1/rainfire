import RainColumn from "./RainColumn";

const RainEffect = ({ gridSize = 20 }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: "60%",
          height: "100vh",
          aspectRatio: "1",
        }}
      >
        {Array.from({ length: gridSize }).map((_, colIndex) => (
          <RainColumn key={colIndex} gridSize={gridSize} />
        ))}
      </div>
    </div>
  );
};

export default RainEffect;