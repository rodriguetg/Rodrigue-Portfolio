import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full mix-blend-difference"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${clicked ? 0.6 : 1})`,
        transition: 'transform 0.15s ease-out',
        width: '20px',
        height: '20px',
        backgroundColor: '#0ea5e9',
        borderRadius: '50%'
      }}
    />
  );
}

