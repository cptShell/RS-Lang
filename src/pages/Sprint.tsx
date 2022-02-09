import React, {MouseEvent, useState} from 'react';
import SprintGame from '../components/sprint/SprintGame';
import { getListQuestionWords, getListWordsByNumberGroup } from '../utils/functions/sprintGameFunctions';
import { WordData } from '../utils/interfaces/interfaces';

const Sprint: React.FC = () => {
  const [startGame, setStartGame] = useState<boolean>(true);
  const [listWords, setListWords] = useState<WordData[]>([]);
  const selectLevelGame = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target }= event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      // const response = await getListWordsByNumberGroup(btnNumber) as WordData[];
      // if(response) {
        // setListWords(JSON.parse(arr) as WordData[]);
        // setStartGame(true);
      // }
    }
  }
  const listButton = [0, 1, 2, 3, 4, 5].map(button => {
    return <button key={button} onClick={selectLevelGame} data-number={button}>{button}</button>
  });
  return (
    <>
      {startGame ? <SprintGame listWords={listWords}/> : listButton}
    </>
  )
};

export default Sprint;
