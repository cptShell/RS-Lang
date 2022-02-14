import React, { useState, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetListWords } from '../redux/actions/audiocallCreator';
import Levels from '../components/sprint/Levels';
import { getListWordsByNumberGroup } from '../utils/functions/sprintGameFunctions';
import { WordData } from '../utils/interfaces/interfaces';
import { RootState } from '../redux/store';


const Audiocall: React.FC = () => {
  const { audiocall } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handlerSelectLevel = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      console.log(btnNumber);
      
      dispatch(asyncGetListWords(btnNumber));
      // const response = await getListWordsByNumberGroup(btnNumber);
      // if (response) {
        // setListWords(response);
        // setStartGame(true);
      // }
    }
  }

  return (
    <>
      {audiocall.startGame ? <div>Start Game</div> : <Levels handlerSelectLevel={handlerSelectLevel}/>}
    </>
  );
};

export default Audiocall;
