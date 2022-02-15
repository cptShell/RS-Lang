import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, resetGame } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';
import { BASE_APP_URL } from '../../utils/constants/constants';
import useAudio from '../../utils/hooks/useAudio';
import AudioButton from '../sprint/AudioButton';

const Audiocall = () => {
  const [playAudioRight] = useAudio('./sounds/right.mp3');
  const [playAudioFail] = useAudio('./sounds/fail.mp3');
  const {
    audiocall: { counter, listQuestions },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onCheckAnswer = (isAnswerRight: boolean) => {
    if (isAnswerRight) {
      playAudioRight();
    } else {
      playAudioFail();
    }
    
    if (counter < listQuestions.length - 1) {
      dispatch(nextQuestion(counter + 1));
    } else {
      alert('end game')
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetGame(false, 0));
    };
  },[]);

  const listAnswers = listQuestions[counter].wordsAnswers.map((wordData, index) => (
    <li key={index}>
      <button onClick={onCheckAnswer.bind(null, wordData.isRight)} data-number={index + 1}>{`${index + 1} ${wordData.wordTranslate}`}</button>
    </li>
  ));

  return (
    <>
      <h1>Audiocall game</h1>
      <AudioButton url={`${BASE_APP_URL}/${listQuestions[counter].audio}`}/>
      <ul>{listAnswers}</ul>
    </>
  );
};

export default Audiocall;
