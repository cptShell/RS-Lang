import React from 'react';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { ListQuestionData } from '../../utils/interfaces/interfaces';
import PlayButton from './AudioButton';

const ResultRound: React.FC<{ result: ListQuestionData[] }> = ({ result }) => {
  const rightAnswer = result.filter((wordData) => wordData.isRight);
  const wrongAnswer = result.filter((wordData) => !wordData.isRight);

  const rightAnswerList = rightAnswer.map((word) => (
    <li key={word.id}>
      <PlayButton url={`${BASE_APP_URL}/${word.audio}`} />
      <p>
        <span>{word.word}</span>
        <span>{word.wordTranslate}</span>
      </p>
    </li>
  ));
  const wrongAnswerList = wrongAnswer.map((word) => (
    <li key={word.id}>
      <PlayButton url={`${BASE_APP_URL}/${word.audio}`} />
      <p>
        <span>{word.word}</span>
        <span>{word.wordTranslate}</span>
      </p>
    </li>
  ));
  return (
    <div className='sprint-result'>
      <h2>Текущий результат: </h2>
      <p className='sprint-result__right'>
        Знаю: <span>{rightAnswer.length}</span>
      </p>
      <ul className='list-result'>{rightAnswerList}</ul>
      <p className='sprint-result__wrong'>
        Ошибок: <span>{wrongAnswer.length}</span>
      </p>
      <ul className='list-result'>{wrongAnswerList}</ul>
    </div>
  );
};

export default ResultRound;
