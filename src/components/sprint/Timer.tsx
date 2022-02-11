import React, { useEffect, useState } from 'react';
import { DELAY_SECOND } from '../../utils/constants/constants';
import { SetTimeout } from '../../utils/types/types';

const Timer: React.FC<{ initTime: number, finishGame: () => void }> = ({ initTime, finishGame }) => {
  let [seconds, setSeconds] = useState<number>(initTime);
  let [timer] = useState<SetTimeout>(null);

  useEffect(() => {
    timer = setTimeout(function tick() {
      if (seconds === 0 && timer) {
        clearTimeout(timer);
        finishGame();
        return;
      }
      setSeconds(seconds - 1);
    }, DELAY_SECOND);
    return () => {
      if (timer) {
        return clearTimeout(timer);
      }
    };
  }, [seconds]);

  return <span className='sprint-timer'>Осталось: {seconds} с</span>;
};

export default Timer;
