import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, resetGame } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';

const Audiocall = () => {
  const {
    audiocall: { counter, listQuestions },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onCheckAnswer = () => {
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

  const listAnswers = listQuestions[counter].wordsAnswers.map((word, index) => (
    <li key={index}>
      <button onClick={onCheckAnswer} data-number={index + 1}>{`${index + 1} ${word.wordTranslate}`}</button>
    </li>
  ));

  return (
    <>
      <h1>Audiocall game</h1>
      <button>audio</button>
      <ul>{listAnswers}</ul>
    </>
  );
};

export default Audiocall;
