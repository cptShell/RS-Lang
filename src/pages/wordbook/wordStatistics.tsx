import React from 'react';
import { ResponseUserWords } from '../../utils/interfaces/interfaces';

export const WordStatistics = ({userWordData, group}: {userWordData: ResponseUserWords, group: number}) => {
  const {
    optional: {
      countRightAnswer,
      countWrongAnswer,
    }
  }: ResponseUserWords = userWordData;

  let gameStatMessage: string;
  if (!countRightAnswer && !countWrongAnswer) {
    gameStatMessage = 'Угадайте это слово в миниигре, чтобы отобразить статистику';
  } else {
    gameStatMessage = `Правильные ответ: ${countRightAnswer} из ${countRightAnswer + countWrongAnswer}`;
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
    <div className='d-flex flex-column gap-2'>
      <span>{ gameStatMessage }</span>
      <div className='d-flex align-items-center gap-2'>
        <span>{ wordProgressMessage }</span>
        <span className='material-icons text-success big'>star</span>
      </div>
    </div>
  )
}