import React, { useEffect, useState } from 'react';
import { BASE_APP_URL, OREDERED_DIFF_LIST } from '../../utils/constants/constants';
import { UserWordData, WordData } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl, playAudioInOrder } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';

export const Card = ({isAuthorized, wordData}:{isAuthorized: boolean, wordData: WordData}): JSX.Element => {
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
  const [isDifficult, setDifficult] = useState<Boolean>(false);
  
  useEffect(() => {
    getDiff();
  }, [isDifficult]);

  const getDiff = () => {
    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordData);
    axios({method: 'get', url, headers: {Authorization: `Bearer ${user.token}`}})
      .then(() => setDifficult(true))
      .catch(() => setDifficult(false));
  }
  
  const toggleDiffWord = async () => {
    const method = isDifficult ? 'delete' : 'post';
    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordData);
    const axiosConfig: AxiosRequestConfig = {method, url, headers: {Authorization: `Bearer ${user.token}`}};
    const userWordData: UserWordData = {
      difficulty: OREDERED_DIFF_LIST[wordData.group],
      optional: {
        isLearned: false
      },
    };

    if (!isDifficult) axiosConfig.data = userWordData;

    await axios(axiosConfig);
    setDifficult(!isDifficult);
  }

  const boundedPlayAudio = playAudioInOrder.bind(this, [audioPath, audioMeaning, audioExample]);
  const imgSrc = `${BASE_APP_URL}/${image}`;

  return (
    <li className={`col d-flex flex-row justify-content-between gap-2 rounded-3 shadow`}>
      <img className='rounded-3' src={imgSrc} alt={wordData.word + ' image'} />
      <div className='d-flex flex-column gap-2 w-100 p-2'>
        <div>
          <div className='d-flex gap-2'>
            <h2 className='me-auto h2 text-capitalize'>{word}</h2>
            {isAuthorized && 
            <button className={`btn-${isDifficult ? 'danger' : 'success'} rounded d-flex align-items-center`} onClick={toggleDiffWord}>
              <span className='material-icons'>
                {isDifficult ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>}
            <button className='btn-success rounded d-flex align-items-center' onClick={boundedPlayAudio}>
              <span className='material-icons'>
                volume_up
              </span>
            </button>
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