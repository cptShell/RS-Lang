import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { addStatisticUser } from '../../utils/functions/statistics';
import { BASE_APP_URL, MESSAGE_IS_AUTH } from '../../utils/constants/constants';
import { addDataAboutWordsToUserWords } from '../../utils/functions/sprintGameFunctions';
import { DataGame, ListQuestionData } from '../../utils/interfaces/interfaces';
import PlayButton from './AudioButton';

const ResultRound: React.FC<{ result: ListQuestionData[], score: number, dataGame?: DataGame }> = ({ result, score, dataGame }) => {
  const rightAnswer = result.filter((wordData) => wordData.isRight);
  const wrongAnswer = result.filter((wordData) => !wordData.isRight);
  const { userData } = useSelector((state: RootState) => state);

  const onRepeatGame = () => {
    if (dataGame?.group && dataGame?.page) {
      window.location.href = `/${dataGame?.name}?group=${dataGame?.group}&page=${dataGame?.page}`;
    }
  }

  useEffect(() => {
    const addData = async () => {
      if (userData.message === MESSAGE_IS_AUTH && userData.token){
        addDataAboutWordsToUserWords(result, userData);
        await addStatisticUser(result, userData);
      }
    }
    addData();
  }, []);

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
      <div className='result-buttons'>
        <button onClick={onRepeatGame} className='btn btn-success'>Играть ещё</button>
        <NavLink className='btn btn-primary' to={'/book'}>Учебник</NavLink>
      </div>
    </div>
  );
};

export default ResultRound;
