import { useEffect, useState } from 'react';

const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.autoplay = true;
    audio.loop = true;
    if (audio.paused) {
      setPlaying(false);
    }
  }, []);

  return [playing, toggle];
};

export default useAudio;
