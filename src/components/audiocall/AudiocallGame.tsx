import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';

const Audiocall = () => {
  const { audiocall } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetGame(false));
    };
  });

  const words = audiocall.listQuestions.map((word) => <li key={word.id}>${word.word}</li>);

  return (
    <>
      <h1>Audiocall game</h1>
      <ul>{words}</ul>
    </>
  );
};

export default Audiocall;
