import React, { useEffect } from 'react';
import useAudio from '../../utils/hooks/useAudio';

const PlayButton: React.FC<{ url: string, className?: string }> = ({ url, className }) => {
  const [togglePlay, setAudio] = useAudio(url);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  return <button onClick={togglePlay} className={className ? className :'speaker-button'}></button>;
};

export default PlayButton;
