import React, { useState } from 'react';
import { BASE_APP_URL, DIFFICULT_GROUP_INDEX } from '../../utils/constants/constants';
import { TotalWordData } from '../../utils/interfaces/interfaces';
import { VolumeButton } from './volumeButton';
import { UserControlPanel } from './controlPanel';

export const Card = ({isAuthorized, totalWordData, learnedCount, setLearnedCount, selectedGroup}:{
  isAuthorized: boolean,
  totalWordData: TotalWordData,
  learnedCount: number,
  setLearnedCount: (learnedCount: number) => void,
  selectedGroup: number,
}): JSX.Element => {
  const [isHidden, setHidden] = useState(false);
  const [isDifficult, setDifficult] = useState(totalWordData.userWordData?.optional.isDifficult || false);
  const [isLearned, setLearned] = useState(totalWordData.userWordData?.optional.isLearned || false);

  const { 
    wordData: {
      group,
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
  const optional = totalWordData.userWordData?.optional || null;
  let cardStyle: string = '';
  let isNewWord: boolean = false;

  if (isDifficult) cardStyle = 'difficult';
  if (isLearned) cardStyle = 'learned';
  if (optional) isNewWord = optional.countRightAnswer + optional.countWrongAnswer === 1;

  return (
    <li className={`col d-flex flex-row justify-content-between gap-2 rounded-3 shadow ${isHidden ? 'hidden' : ''} ${cardStyle}`}>
      <img className='rounded-3' src={imgSrc} alt={word + ' image'} />
      <div className='d-flex flex-column gap-2 w-100 p-2'>
        <div>
          <div className='d-flex align-content-center gap-2'>
            <div>
              <h2 className='h2 text-capitalize'>{word}</h2>
              {isNewWord && <span className='text-secondary'>НОВОЕ СЛОВО!</span>}
            </div>
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
        {
          (isAuthorized && totalWordData.userWordData) && 
          <UserControlPanel
            group={group}
            selectedGroup={selectedGroup}
            userWordData={totalWordData.userWordData}
            learnedCount={learnedCount}
            setLearnedCount={setLearnedCount}
            setHidden={setHidden}
            setDifficult={setDifficult}
            setLearned={setLearned}
          />
        }
      </div>
    </li>
  );
};