import React, { MouseEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SprintGame from '../components/sprint/SprintGame';
import Levels from '../components/sprint/Levels';
import Preloader from '../components/Preloader';
import {
  excludeLearnedWords,
  getListWordsByNumberGroup,
  getRandomNumber,
} from '../utils/functions/sprintGameFunctions';
import { DataGame, WordData } from '../utils/interfaces/interfaces';
import { INIT_GROUP, INIT_PAGE, MAX_PAGE, MESSAGE_IS_AUTH, MIN_PAGE } from '../utils/constants/constants';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { NameGame } from '../utils/enum/enum';

const Sprint: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [listWords, setListWords] = useState<WordData[]>([]);
  const [searchParams] = useSearchParams();
  const group = searchParams.get('group');
  const page = searchParams.get('page');
  const currentGroup = group ? group : INIT_GROUP;
  const currentPage = page ? page : INIT_PAGE;
  const [dataGame, setDataGame] = useState<DataGame>({ name: NameGame.SPRINT, group: currentGroup, page: currentPage });

  useEffect(() => {
    const startGameFromBook = async () => {
      let listWordsFromBook: WordData[] = [];
      if (group && page) {
        setLoading(true);

        const responseDataWords = await getListWordsByNumberGroup(group, page);
        if (userData.message === MESSAGE_IS_AUTH && responseDataWords) {
          listWordsFromBook.push(...responseDataWords);
        }

        setListWords(listWordsFromBook);
        setDataGame({ ...dataGame, group, page });
        setStartGame(true);
        setLoading(false);
      }
    };
    startGameFromBook();
  }, []);

  const selectLevelGame = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      const randomNumberPage = getRandomNumber(MIN_PAGE, MAX_PAGE);
      const response = await getListWordsByNumberGroup(btnNumber, '', setLoading);
      if (response) {
        setListWords(response);
        setDataGame({ ...dataGame, group: btnNumber, page: randomNumberPage.toString() });
        setStartGame(true);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : <>
          {startGame ? (
            <SprintGame listWords={listWords} dataGame={dataGame} />
          ) : (
            <Levels handlerSelectLevel={selectLevelGame} nameGame={dataGame.name}/>
          )}
        </>
      }
    </>
  );
};

export default Sprint;
