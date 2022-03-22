import React, { useEffect, useRef } from 'react';

const Audio = React.forwardRef<HTMLButtonElement, {url: string}>((props, ref) => {
  const audioElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioElement.current?.load();
    play();
  }, [props.url]);

  const play = () => {
    audioElement.current?.play();
  };

  return (
    <div className='speaker'>
      <button onClick={play} className='speaker__button' ref={ref}>
      </button>
      <audio ref={audioElement}>
          <source src={props.url} />
        </audio>
    </div>
  );
});

export default Audio;
