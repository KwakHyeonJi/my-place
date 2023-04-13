import { useEffect, useState } from 'react';

const useButton = (container: HTMLElement | null) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isClicked && !container?.contains(target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isClicked]);

  return { isClicked, handleClick, handleToggle };
};

export default useButton;
