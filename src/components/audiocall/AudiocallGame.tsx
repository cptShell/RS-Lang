import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, resetGame, finishGame } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';
import { BASE_APP_URL } from '../../utils/constants/constants';
import useAudio from '../../utils/hooks/useAudio';
import { ListQuestionData } from '../../utils/interfaces/interfaces';
import ResultRound from '../sprint/ResultRound';
import Audio from './Audio';

const Audiocall = () => {
  const [playAudioRight] = useAudio('./sounds/right.mp3');
  const [playAudioFail] = useAudio('./sounds/fail.mp3');
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const {
    audiocall: { counter, listQuestions, listResults, endGame },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onCheckAnswer = (isAnswerRight: boolean, event: MouseEvent<HTMLElement>) => {
    const currentWordData = listQuestions[counter];
    setDisabledButton(true);
    if (isAnswerRight) {
      playAudioRight();
    } else {
      playAudioFail();
    }

    if (counter <= listQuestions.length - 1) {
      setIsRight(isAnswerRight)
      const { id, word, audio, wordTranslate, group, rightTranslate } = currentWordData;
      const result: ListQuestionData = {id, word, audio, wordTranslate, group, rightTranslate, isRight: isAnswerRight};
      listResults.push(result);
      if (counter === listQuestions.length - 1) {
        dispatch(finishGame(true, listResults)); 
      }
    }
  }

  const onNextQuestion = () => {
    setDisabledButton(false);
    dispatch(nextQuestion(counter + 1, listResults));
  }

  useEffect(() => {
    return () => {
      dispatch(resetGame(false, false, 0));
    };
  },[]);

  const listAnswers = listQuestions[counter].wordsAnswers.map((wordData, index) => (
    <li key={index}>
      <button onClick={onCheckAnswer.bind(null, wordData.isRight)} data-number={index + 1} disabled={disabledButton}>{`${index + 1} ${wordData.wordTranslate}`}</button>
    </li>
  ));

  return (
    <div>{endGame ? (
        <ResultRound result={listResults} score={100}/>
      ) : (<>
      <h1>Audiocall game</h1>
      <Audio url={`${BASE_APP_URL}/${listQuestions[counter].audio}`}/>
      {disabledButton && <h2 className={!isRight ? 'red' : 'green'}>{listQuestions[counter].word}</h2>}
      <ul>{listAnswers}</ul>
      <button onClick={onNextQuestion} disabled={!disabledButton}>Дальше</button>
    </>)}</div>
  );
};

export default Audiocall;
