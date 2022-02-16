import React, { useEffect, useRef } from 'react';

const Audio: React.FC<{url: string}> = ({ url }) => {
  const audioElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioElement.current?.load();
    play();
  }, [url]);

  const play = () => {
    audioElement.current?.play();
  };

  return (
    <div className='speaker'>
      <button onClick={play} className='speaker__button'>
      </button>
      <audio ref={audioElement}>
          <source src={url} />
        </audio>
    </div>
  );
};

export default Audio;
