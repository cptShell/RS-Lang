import React, { MouseEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SprintGame from '../components/sprint/SprintGame';
import Levels from '../components/sprint/Levels';
import { excludeLearnedWords, getListWordsByNumberGroup } from '../utils/functions/sprintGameFunctions';
import { WordData } from '../utils/interfaces/interfaces';
import { MESSAGE_IS_AUTH } from '../utils/constants/constants';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Sprint: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [listWords, setListWords] = useState<WordData[]>([]);
  const [searchParams] = useSearchParams();
  const group = searchParams.get('group');
  const page = searchParams.get('page');

  

  useEffect(() => {
    const startGameFromBook = async () => {
      let listWordsFromBook: WordData[] = []
      if (group && page) {
        const responseDataWords = await getListWordsByNumberGroup(group, page);
        if (userData.message === MESSAGE_IS_AUTH && responseDataWords) {
          listWordsFromBook = await excludeLearnedWords(responseDataWords, userData);
        } else if (responseDataWords) {
          listWordsFromBook = responseDataWords;
        }
        setListWords(listWordsFromBook);
        setStartGame(true);
      }
    };
    startGameFromBook();
  }, []);

  const selectLevelGame = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      const response = await getListWordsByNumberGroup(btnNumber);
      if (response) {
        setListWords(response);
        setStartGame(true);
      }
    }
  };

  return <>{startGame ? <SprintGame listWords={listWords} /> : <Levels handlerSelectLevel={selectLevelGame} />}</>;
};

export default Sprint;
