import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../components/Preloader';
import { STATUS_200 } from '../redux/constants';
import { RootState } from '../redux/store';
import { getStatistic, StatisticData } from '../utils/functions/statistics';
import BookStatistic from '../components/statistic/BookStatistic';
import Games from '../components/statistic/Games';

const Statistics: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticGame, setStatisticGame] = useState<StatisticData>();
  const { userData } = useSelector((state: RootState) => state);
  

  useEffect(() => {
    const loadStatistic = async () => {
      const response = await getStatistic(userData, setLoading);
      if(response?.status === STATUS_200) {
        setStatisticGame(response.data);
      }
    }
    loadStatistic();
  }, []);
  
  return (
    <>
      {loading ? <Preloader /> : <div className='container'> <Games statisticData={statisticGame} />  <BookStatistic /></div>  }
    </>
  );
};

export default Statistics;
