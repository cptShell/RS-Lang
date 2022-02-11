import React, { useEffect, useState } from 'react';
import useAudio from '../../utils/hooks/useAudio';

const PlayButton: React.FC<{ url: string }> = ({ url }) => {
  const [togglePlay, setAudio] = useAudio(url);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  return <button onClick={togglePlay} className='speaker-button'></button>;
};

export default PlayButton;
