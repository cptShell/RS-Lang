import React from 'react';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { WordData } from '../../utils/interfaces/inerface';
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
    <li className="col d-flex flex-row justify-content-between gap-2 rounded-3 shadow">
      <img className='rounded-3' src={imgSrc} alt={wordData.word + ' image'} />
      <div className='d-flex flex-column gap-2 w-100'>
        <div>
          <h2 className='h2 text-capitalize'>{word}</h2>
          <p>{'Transcription: ' + transcription}</p>
          <p>{'Перевод: ' + wordTranslate}</p>
        </div>
        <div>
          <p dangerouslySetInnerHTML={{__html: 'Meaning: ' + textMeaning}}></p>
          <p dangerouslySetInnerHTML={{__html: 'Example: ' + textExample}}></p>
        </div>
        <div>
          <p>{'Значение: ' + textMeaningTranslate}</p>
          <p>{'Пример: ' + textExampleTranslate}</p>
        </div>
      </div>
      <button className='btn-success rounded v-100' onClick={boundedPlayAudio}>PLAY</button>
    </li>
  );
};