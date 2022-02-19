import React from 'react';
import { ResponseUserWords } from '../../utils/interfaces/interfaces';

export const WordStatistics = ({userWordData, group}: {userWordData: ResponseUserWords, group: number}) => {
  const {
    optional: {
      isLearned,
      countRightAnswer,
      countWrongAnswer,
      rowAnswers,
    }
  }: ResponseUserWords = userWordData;

  let rightAnswersMessage: string;
  if (!(countRightAnswer + countWrongAnswer)) {
    rightAnswersMessage = `Откройте статистику по верным ответам, сыграв это слово в миниигре`;
  } else if (!countRightAnswer) {
    rightAnswersMessage = `Вы еще ни разу не дали верный ответ, изучите слово и сыграйте его`;
  } else {
    rightAnswersMessage = `Общее количество верных ответов: ${countRightAnswer}`;
  }

  let wrongAnswersMessage: string;
  if (!(countRightAnswer + countWrongAnswer)) {
    wrongAnswersMessage = `Откройте статистику по ошибкам, сыграв это слово в миниигре`;
  } else if (!countWrongAnswer) {
    wrongAnswersMessage = `Вы еще ни разу не ошибались, так держать!`;
  } else {
    wrongAnswersMessage = `Общее количество ошибок: ${countRightAnswer}`;
  }

  let wordProgressMessage: string;
  const neededCountNum = (group + 1) * 2 - rowAnswers;
  const neededCountWord = [2,3,4].some(num => neededCountNum === num) ? 'раза' : 'раз';
  if (!isLearned) {
    wordProgressMessage = `Чтобы изучить это слово, угадайте его еще ${neededCountNum} ${neededCountWord} подряд`
  } else {
    wordProgressMessage = `Текущая серия верных ответов: ${rowAnswers}`;
  }

  let percentMessage: string;
  if (!(countRightAnswer + countWrongAnswer)) {
    percentMessage = `Откройте статистику по процентам, сыграв это слово в миниигре`;
  } else {
    const percetage = ((countRightAnswer / (countRightAnswer + countWrongAnswer)) * 100).toFixed(1);
    percentMessage = `Общий процент правильных ответов: ${percetage}%`;
  }


  return (
    <div>
      <h3>Статистика</h3>
      <ul className='d-flex flex-column gap-2 pt-2'>
        <li><span>{ rightAnswersMessage }</span></li>
        <li><span>{ wrongAnswersMessage }</span></li>
        <li><span>{ percentMessage }</span></li>
        <li><span>{ wordProgressMessage }</span></li>
      </ul>
    </div>
  )
}