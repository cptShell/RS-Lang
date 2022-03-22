import React from 'react';
import { playAudioInOrder } from '../../utils/functions/supportMethods';

export const VolumeButton = ({orderedAudioList}: {orderedAudioList: Array<string>}) => {
  const boundedPlayAudio = playAudioInOrder.bind(this, orderedAudioList);

  return (
    <button className='btn-success rounded d-flex align-items-center' onClick={boundedPlayAudio}>
      <span className='material-icons'>
        volume_up
      </span>
    </button>
  )
}