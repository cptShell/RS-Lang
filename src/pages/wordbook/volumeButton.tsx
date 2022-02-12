import React, { useEffect, useState } from 'react';
import { playAudioInOrder } from '../../utils/functions/supportMethods';
import { WordData } from '../../utils/interfaces/interfaces';

export const VolumeButton = ({wordData}: {wordData: WordData}) => {
  const { audio: audioPath, audioExample, audioMeaning}: WordData = wordData;
  const boundedPlayAudio = playAudioInOrder.bind(this, [audioPath, audioMeaning, audioExample]);

  return (
    <button className='btn-success rounded d-flex align-items-center' onClick={boundedPlayAudio}>
      <span className='material-icons'>
        volume_up
      </span>
    </button>
  )
}