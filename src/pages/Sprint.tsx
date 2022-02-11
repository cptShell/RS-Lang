import React, {MouseEvent, useState} from 'react';
import SprintGame from '../components/sprint/SprintGame';
import Levels from '../components/sprint/Levels';
import { getListWordsByNumberGroup } from '../utils/functions/sprintGameFunctions';
import { WordData } from '../utils/interfaces/interfaces';

const Sprint: React.FC = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [listWords, setListWords] = useState<WordData[]>([]);

  const selectLevelGame = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target }= event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      const response = await getListWordsByNumberGroup(btnNumber) as WordData[];
      if(response) {
        setListWords(response);
        setStartGame(true);
      }
    }
  }
  
  return (
    <>
      {startGame ? <SprintGame listWords={listWords}/> : <Levels handlerSelectLevel={selectLevelGame}/>}
    </>
  )
};

export default Sprint;
