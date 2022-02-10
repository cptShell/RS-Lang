import React, { useEffect, useState, MouseEvent } from 'react';
import useAudio from '../../utils/hooks/useAudio';
import { BASE_APP_URL } from '../../utils/constants/constants';



const PlayButton: React.FC<{ url: string }> = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default PlayButton;

