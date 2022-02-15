import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, resetGame, finishGame } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';
import { BASE_APP_URL } from '../../utils/constants/constants';
import useAudio from '../../utils/hooks/useAudio';
import { ListQuestionData } from '../../utils/interfaces/interfaces';
import AudioButton from '../sprint/AudioButton';
import ResultRound from '../sprint/ResultRound';

const Audiocall = () => {
  const [playAudioRight] = useAudio('./sounds/right.mp3');
  const [playAudioFail] = useAudio('./sounds/fail.mp3');
  const {
    audiocall: { counter, listQuestions, listResults, endGame },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onCheckAnswer = (isAnswerRight: boolean) => {
    const currentWordData = listQuestions[counter];
    if (isAnswerRight) {
      playAudioRight();
    } else {
      playAudioFail();
    }
    
    if (counter <= listQuestions.length - 1) {
      const { id, word, audio, wordTranslate, group, rightTranslate } = currentWordData;
      const result: ListQuestionData = {id, word, audio, wordTranslate, group, rightTranslate, isRight: isAnswerRight};
      listResults.push(result);
      if (counter === listQuestions.length - 1) {
        dispatch(finishGame(true, listResults)); 
      } else {
        dispatch(nextQuestion(counter + 1, listResults));
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetGame(false, false, 0));
    };
  },[]);

  const listAnswers = listQuestions[counter].wordsAnswers.map((wordData, index) => (
    <li key={index}>
      <button onClick={onCheckAnswer.bind(null, wordData.isRight)} data-number={index + 1}>{`${index + 1} ${wordData.wordTranslate}`}</button>
    </li>
  ));

  return (
    <div>{endGame ? (
        <ResultRound result={listResults} score={100}/>
      ) : (<>
      <h1>Audiocall game</h1>
      <AudioButton url={`${BASE_APP_URL}/${listQuestions[counter].audio}`}/>
      <ul>{listAnswers}</ul>
    </>)}</div>
  );
};

export default Audiocall;
