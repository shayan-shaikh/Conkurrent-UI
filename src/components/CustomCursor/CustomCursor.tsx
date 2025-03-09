import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full shadow-lg pointer-events-none  mix-blend-difference"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 1000
      }}
    />
  );
};

export default CustomCursor;
