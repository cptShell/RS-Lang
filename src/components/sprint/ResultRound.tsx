import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BASE_APP_URL, MESSAGE_IS_AUTH } from '../../utils/constants/constants';
import { addDataAboutWordsToUserWords } from '../../utils/functions/sprintGameFunctions';
import { ListQuestionData } from '../../utils/interfaces/interfaces';
import PlayButton from './AudioButton';

const ResultRound: React.FC<{ result: ListQuestionData[], score: number }> = ({ result, score }) => {
  const rightAnswer = result.filter((wordData) => wordData.isRight);
  const wrongAnswer = result.filter((wordData) => !wordData.isRight);
  const { userData } = useSelector((state: RootState) => state);

  if (userData.message === MESSAGE_IS_AUTH && userData.token){
    addDataAboutWordsToUserWords(result, userData);
  }

  const rightAnswerList = rightAnswer.map((word) => (
    <li key={word.id}>
      <PlayButton url={`${BASE_APP_URL}/${word.audio}`} />
      <p>
        <span>{word.word}</span>
        <span>{word.rightTranslate}</span>
      </p>
    </li>
  ));
  const wrongAnswerList = wrongAnswer.map((word) => (
    <li key={word.id}>
      <PlayButton url={`${BASE_APP_URL}/${word.audio}`} />
      <p>
        <span>{word.word}</span>
        <span>{word.rightTranslate}</span>
      </p>
    </li>
  ));
  return (
    <div className='result'>
      <h2>Текущий результат: {score}</h2>
      <p className='result__right'>
        Знаю: <span>{rightAnswer.length}</span>
      </p>
      <ul className='list-result'>{rightAnswerList}</ul>
      <p className='result__wrong'>
        Ошибок: <span>{wrongAnswer.length}</span>
      </p>
      <ul className='list-result'>{wrongAnswerList}</ul>
    </div>
  );
};

export default ResultRound;
