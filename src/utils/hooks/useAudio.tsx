import React, { useEffect, useState } from 'react';

const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState<HTMLAudioElement>(new Audio(url));
  const [playing, setPlaying] = useState<boolean>(false);

  const toggle: () => void = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default useAudio;