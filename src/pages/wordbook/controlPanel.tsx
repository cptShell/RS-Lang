import React, { useState } from 'react';
import { ResponseUserWords } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';
import { WordStatistics } from './wordStatistics';
import { DIFFICULT_GROUP_INDEX } from '../../utils/constants/constants';

export const UserControlPanel = ({userWordData, group, learnedCount, setLearnedCount, setHidden, selectedGroup}: {
  userWordData: ResponseUserWords,
  group: number,
  learnedCount: number,
  setLearnedCount: (leanedCount: number) => void,
  setHidden: (value: boolean) => void,
  selectedGroup: number,
}) => {
  const [userWordState, setUserWordState] = useState<ResponseUserWords>(userWordData);

  const {
    optional: {
      isDifficult,
      isLearned,
      countRightAnswer,
      countWrongAnswer,
    },
    wordId,
  }: ResponseUserWords = userWordData;

  console.log(selectedGroup);

  const toggleUserWordState = async (caseWord: string): Promise<void> => {
    switch(caseWord) {
      case 'difficult':
        userWordState.optional.isDifficult = !isDifficult;
        if (selectedGroup === DIFFICULT_GROUP_INDEX) setHidden(true);
        break;
      case 'learn':
        userWordState.optional.isLearned = !isLearned;
        setLearnedCount(learnedCount + (userWordState.optional.isLearned ? 1 : -1));
        break;
    }

    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordId);
    const {difficulty, optional}: ResponseUserWords = userWordState;
    const axiosConfig: AxiosRequestConfig = {method: 'put', url, headers: {Authorization: `Bearer ${user.token}`}, data: {difficulty, optional}};

    await axios(axiosConfig);
    setUserWordState({...userWordData});
  }

  let gameStatMessage: string;
  if (!countRightAnswer && !countWrongAnswer) {
    gameStatMessage = 'Угадайте это слово в миниигре, чтобы отобразить статистику';
  } else {
    gameStatMessage = `Правильные ответы: ${countRightAnswer} из ${countRightAnswer + countWrongAnswer}`;
  }

  let wordProgressMessage: string;
  if (countRightAnswer < ((group + 1) * 2)) {
    const neededCountNum = (group + 1) * 2 - countRightAnswer;
    const neededCountWord = [2,3,4].some(num => neededCountNum === num) ? 'раза' : 'раз';
    wordProgressMessage = `Угадайте это слово еще ${neededCountNum} ${neededCountWord}, для`
  } else {
    wordProgressMessage = `Слово полностью изучено`
  }
  
  return (
    <div className='d-flex flex-column gap-2 border-top border-2'>
      <WordStatistics group={group} userWordData={userWordData}/>
      {
        selectedGroup === DIFFICULT_GROUP_INDEX ?
        (
          <div className='d-flex align-items-center gap-2 border-top border-2 pt-2'>
            <button className={`btn-success rounded d-flex align-items-center h-100`} onClick={() => toggleUserWordState('difficult')}>
              <span className='material-icons'>highlight_off</span>
            </button>
          Убрать слово из списка сложных
          </div>
        ) : (
          <div className='d-flex flex-column gap-2 pt-2 border-top border-2'>
            <div className='d-flex align-items-center gap-2 pt-2'>
              <button className={`btn-${isDifficult ? 'danger' : 'success'} rounded d-flex align-items-center h-100`} onClick={() => toggleUserWordState('difficult')}>
                <span className='material-icons'>
                  {!isDifficult ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
              {isDifficult ? 'Слово отмечено как "Сложное"' : 'Нажмите, чтобы отметить как "Сложное"'}
            </div>
            <div className='d-flex align-items-center gap-2'>
              <button className={`btn-${!isLearned ? 'danger' : 'success'} rounded d-flex align-items-center h-100`} onClick={() => toggleUserWordState('learn')}>
                <span className='material-icons'>
                  {`radio_button_${isLearned ? '' : 'un'}checked`}
                </span>
              </button>
              {!isLearned ? 'Слово не изучено' : 'Слово изучено'}
            </div>
          </div>
        )
      }
    </div>
  )
}