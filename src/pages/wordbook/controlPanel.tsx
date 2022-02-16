import React, { useState } from 'react';
import { DataUserWord, ResponseUserWords } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';

export const ControlPanel = ({userWordData}: {userWordData: ResponseUserWords}) => {
  const [userWordState, setUserWordState] = useState<ResponseUserWords>(userWordData);
  const {
    optional: {
      isDifficult,
      isLearned,
    },
    wordId,
  }: ResponseUserWords = userWordData;

  const toggleUserWordState = async (caseWord: string): Promise<void> => {
    switch(caseWord) {
      case 'difficult':
        userWordState.optional.isDifficult = !isDifficult;
        break;
      case 'learn':
        userWordState.optional.isLearned = !isLearned;
        break;
    }

    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordId);
    const {difficulty, optional}: ResponseUserWords = userWordState;
    const axiosConfig: AxiosRequestConfig = {method: 'put', url, headers: {Authorization: `Bearer ${user.token}`}, data: {difficulty, optional}};

    await axios(axiosConfig);
    setUserWordState({...userWordData});
  }

  
  return (
    <div className='d-flex flex-column gap-2'>
      <div className='d-flex align-items-center gap-2'>
        <button className={`btn-${isDifficult ? 'danger' : 'success'} rounded d-flex align-items-center h-100`} onClick={() => toggleUserWordState('difficult')}>
          <span className='material-icons'>
            {isDifficult ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
        {isDifficult ? 'Снять статус как "сложное слово"' : 'Задать статус "сложного слова"'}
      </div>
      <div className='d-flex align-items-center gap-2'>
        <button className={`btn-${isLearned ? 'danger' : 'success'} rounded d-flex align-items-center h-100`} onClick={() => toggleUserWordState('learn')}>
          <span className='material-icons'>
            {`radio_button_${isLearned ? '' : 'un'}checked`}
          </span>
        </button>
        {isLearned ? 'Снять статус "изучено"' : 'Задать статус "изучено"'}
      </div>
      
    </div>
  )
}