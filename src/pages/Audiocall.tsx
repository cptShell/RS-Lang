import React, { useState, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../components/Preloader';
import { asyncGetListWords } from '../redux/actions/audiocallCreator';
import AudiocallGame from '../components/audiocall/AudiocallGame';
import Levels from '../components/sprint/Levels';
import { getRandomNumber } from '../utils/functions/sprintGameFunctions';
import { RootState } from '../redux/store';
import { INIT_GROUP, INIT_PAGE, MAX_PAGE, MIN_PAGE } from '../utils/constants/constants';
import { useSearchParams } from 'react-router-dom';
import { DataGame } from '../utils/interfaces/interfaces';
import { NameGame } from '../utils/enum/enum';


const Audiocall: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { audiocall } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const group = searchParams.get('group');
  const page = searchParams.get('page');
  const currentGroup = group ? group : INIT_GROUP;
  const currentPage = page ? page : INIT_PAGE;
  const [dataGame, setDataGame] = useState<DataGame>({name: NameGame.AUDIOCALL, group: currentGroup, page: currentPage});

  const handlerSelectLevel = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      const randomNumberPage = getRandomNumber(MIN_PAGE, MAX_PAGE);
      setDataGame({...dataGame, group: btnNumber, page: randomNumberPage.toString()});
      dispatch(asyncGetListWords(btnNumber, randomNumberPage.toString(), setLoading));
    }
  }

  useEffect(() => {
    if (group && page) {
      setDataGame({...dataGame, group, page});
      dispatch(asyncGetListWords(group, page, setLoading));
    }
  }, []);

  return (
    <>{loading ? <Preloader /> :
      <>
        {audiocall.startGame ? <AudiocallGame dataGame={dataGame}/>: <Levels handlerSelectLevel={handlerSelectLevel} nameGame={dataGame.name}/>}
      </>
    }
    </>
  );
};

export default Audiocall;
