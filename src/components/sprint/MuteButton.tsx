import React from 'react';

const MuteButton:React.FC<{isMute: boolean, setMute: React.Dispatch<React.SetStateAction<boolean>> }> = ({isMute, setMute}) => {

  const onToggleMute = () => {
    setMute(!isMute);
  }

  return (
    <button onClick={onToggleMute} className={isMute ? 'mute-button' : 'volume-button'}></button>
  );
}

export default MuteButton;