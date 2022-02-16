import React, { useState, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../components/Preloader';
import { asyncGetListWords } from '../redux/actions/audiocallCreator';
import AudiocallGame from '../components/audiocall/AudiocallGame';
import Levels from '../components/sprint/Levels';
import { getRandomNumber } from '../utils/functions/sprintGameFunctions';
import { RootState } from '../redux/store';
import { MAX_PAGE, MIN_PAGE } from '../utils/constants/constants';


const Audiocall: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { audiocall } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handlerSelectLevel = async (event: MouseEvent<HTMLButtonElement>) => {
    const { target } = event;
    const btnNumber = (target as HTMLElement).getAttribute('data-number');
    if (btnNumber) {
      console.log(btnNumber);
      const randomNumberPage = getRandomNumber(MIN_PAGE, MAX_PAGE);
      dispatch(asyncGetListWords(btnNumber, randomNumberPage.toString(), setLoading));
    }
  }

  return (
    <>{loading ? <Preloader /> :
      <>
        {audiocall.startGame ? <AudiocallGame />: <Levels handlerSelectLevel={handlerSelectLevel}/>}
      </>
    }
    </>
  );
};

export default Audiocall;
