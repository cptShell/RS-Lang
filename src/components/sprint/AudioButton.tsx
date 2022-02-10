import React from 'react';
import useAudio from '../../utils/hooks/useAudio';

const PlayButton: React.FC<{ url: string }> = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return <button onClick={toggle} className='speaker-button'></button>;
};

export default PlayButton;
