import React from 'react';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { WordData } from '../../utils/interfaces/interfaces';
import { playAudioInOrder } from '../../utils/functions/supportMethods';

export const Card = ({wordData}:{wordData: WordData}): JSX.Element => {
  const {
    word,
    image,
    wordTranslate, 
    audio: audioPath, 
    audioExample,
    audioMeaning,
    textExample, 
    textExampleTranslate, 
    textMeaning, 
    textMeaningTranslate,
    transcription
  }: WordData = wordData;

  const boundedPlayAudio = playAudioInOrder.bind(this, [audioPath, audioMeaning, audioExample]);
  const imgSrc = `${BASE_APP_URL}/${image}`;
  return (
    <li>
      <img src={imgSrc} alt="word image" />
      <h2>{word}</h2>
      <p>{transcription}</p>
      <p>{wordTranslate}</p>
      <button onClick={boundedPlayAudio}>PLAY</button>
      <p dangerouslySetInnerHTML={{__html: textMeaning}}></p>
      <p dangerouslySetInnerHTML={{__html: textExample}}></p>
      <p>{textMeaningTranslate}</p>
      <p>{textExampleTranslate}</p>
    </li>
  );
};