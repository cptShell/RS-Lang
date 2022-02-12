import React, { useEffect, useState } from 'react';
import { BASE_APP_URL, OREDERED_DIFF_LIST } from '../../utils/constants/constants';
import { UserWordData, WordData } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';
import { VolumeButton } from './volumeButton';
import { DiffToggler } from './DiffToggler';

export const Card = ({isAuthorized, wordData}:{isAuthorized: boolean, wordData: WordData}): JSX.Element => {
  const {
    word,
    image,
    wordTranslate,
    textExample, 
    textExampleTranslate, 
    textMeaning, 
    textMeaningTranslate,
    transcription
  }: WordData = wordData;

  const imgSrc = `${BASE_APP_URL}/${image}`;

  return (
    <li className={`col d-flex flex-row justify-content-between gap-2 rounded-3 shadow`}>
      <img className='rounded-3' src={imgSrc} alt={wordData.word + ' image'} />
      <div className='d-flex flex-column gap-2 w-100 p-2'>
        <div>
          <div className='d-flex gap-2'>
            <h2 className='me-auto h2 text-capitalize'>{word}</h2>
            {isAuthorized && <DiffToggler wordData={wordData} />}
            <VolumeButton wordData={wordData} />
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
      </div>
    </li>
  );
};