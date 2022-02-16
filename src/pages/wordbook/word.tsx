import React from 'react';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { TotalWordData } from '../../utils/interfaces/interfaces';
import { VolumeButton } from './volumeButton';
import { ControlPanel } from './controlPanel';
import { LearnToggler } from './LearnToggler';

export const Card = ({isAuthorized, totalWordData}:{isAuthorized: boolean, totalWordData: TotalWordData}): JSX.Element => {
  const { 
    wordData: {
      image,
      word,
      wordTranslate,
      transcription,
      textExample,
      textMeaning,
      textExampleTranslate, 
      textMeaningTranslate,
      audio,
      audioExample,
      audioMeaning,
    }
  }: TotalWordData = totalWordData;

  const imgSrc = `${BASE_APP_URL}/${image}`;
  let borderColor = 'warning';
  if (totalWordData.userWordData) {
    const {
      userWordData: {
        optional: {
          isDifficult,
          isLearned,
        }
      }
    }: TotalWordData = totalWordData;
    borderColor = isLearned ? 'success' : 'warning';
    if (isDifficult) borderColor = 'danger';
  }

  return (
    <li className={`col d-flex flex-row justify-content-between gap-2 rounded-3 shadow border border-${borderColor} border-3`}>
      <img className='rounded-3' src={imgSrc} alt={word + ' image'} />
      <div className='d-flex flex-column gap-2 w-100 p-2'>
        <div>
          <div className='d-flex gap-2'>
            <h2 className='me-auto h2 text-capitalize'>{word}</h2>
            <VolumeButton orderedAudioList={[audio, audioMeaning, audioExample]} />
          </div>
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
        {(isAuthorized && totalWordData.userWordData) && <ControlPanel userWordData={totalWordData.userWordData}/>}
      </div>
    </li>
  );
};