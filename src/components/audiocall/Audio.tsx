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
    <>
      <button onClick={play}>
        play
      </button>
      <audio ref={audioElement}>
          <source src={url} />
        </audio>
    </>
  );
};

export default Audio;
