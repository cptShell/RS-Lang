import React, { useState, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetListWords } from '../redux/actions/audiocallCreator';
import AudiocallGame from '../components/audiocall/AudiocallGame';
import Levels from '../components/sprint/Levels';
import { getListWordsByNumberGroup, getRandomNumber } from '../utils/functions/sprintGameFunctions';
import { WordData } from '../utils/interfaces/interfaces';
import { RootState } from '../redux/store';
import { MAX_PAGE, MIN_PAGE } from '../utils/constants/constants';


const Audiocall: React.FC = () => {
  const { audiocall } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handlerSelectLevel = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      console.log(btnNumber);
      const randomNumberPage = getRandomNumber(MIN_PAGE, MAX_PAGE);
      dispatch(asyncGetListWords(btnNumber, randomNumberPage.toString()));
      // const response = await getListWordsByNumberGroup(btnNumber);
      // if (response) {
        // setListWords(response);
        // setStartGame(true);
      // }
    }
  }

  return (
    <>
      {audiocall.startGame ? <AudiocallGame />: <Levels handlerSelectLevel={handlerSelectLevel}/>}
    </>
  );
};

export default Audiocall;
