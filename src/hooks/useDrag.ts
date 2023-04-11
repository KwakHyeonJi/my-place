import { useEffect, useState } from 'react';

const useDrag = () => {
  const [isDragging, setIsDragging] = useState<boolean>(true);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    const xGap = Math.abs(e.clientX - startPosition.x);
    const yGap = Math.abs(e.clientY - startPosition.y);

    if (xGap > 5 || yGap > 5) {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [startPosition]);

  return isDragging;
};

export default useDrag;
