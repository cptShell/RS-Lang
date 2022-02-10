import React, { useEffect, useState } from 'react';

const useAudio = (url: string): [() => void, React.Dispatch<React.SetStateAction<HTMLAudioElement>>] => {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(url));
  const [playing, setPlaying] = useState<boolean>(false);

  const togglePlay: () => void = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [togglePlay, setAudio];
};

export default useAudio;