import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { options, labels, INIT_STATISTIC_DATA, YELLOW_COLOR, GREEN_COLOR, BLUE_COLOR } from './constantsBook';
import { StatisticData } from '../../utils/functions/statistics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getStatisticData = (statisticData: StatisticData) => {
  const audiocall = statisticData.optional.audiocall;
  const sprint = statisticData.optional.sprint;
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов за день',
        data: [0],
        backgroundColor: YELLOW_COLOR,
      },
      {
        label: 'Количество изученных слов за день',
        data: [0],
        backgroundColor: GREEN_COLOR,
      },
      {
        label: 'Процент правильных ответов за день',
        data: [0],
        backgroundColor: BLUE_COLOR,
      },
    ],
  };
  if (audiocall && sprint) {
    data.datasets[0].data[0] = audiocall.counterNewWords + sprint.counterNewWords;
    data.datasets[1].data[0] = statisticData.learnedWords;
    data.datasets[2].data[0] = Math.floor(((audiocall.percent.percent / audiocall.percent.counter) + (sprint.percent.percent / sprint.percent.counter)) / 2);
  } else if (audiocall && !sprint) {
    data.datasets[0].data[0] = audiocall.counterNewWords;
    data.datasets[1].data[0] = statisticData.learnedWords;
    data.datasets[2].data[0] = Math.floor(audiocall.percent.percent / audiocall.percent.counter);
  } else if (sprint && !audiocall) {
    data.datasets[0].data[0] = sprint.counterNewWords;
    data.datasets[1].data[0] = statisticData.learnedWords;
    data.datasets[2].data[0] = Math.floor(sprint.percent.percent / sprint.percent.counter);
  }
  return data;
};

const BookStatistic: React.FC<{statisticData: StatisticData | undefined}> = ({ statisticData }) => {
  const [data, setData] = useState(INIT_STATISTIC_DATA);
  useEffect(() => {
    if (statisticData) {
      setData(getStatisticData(statisticData));
    }
  }, [statisticData]); 
  
  return (
    <div className='col-12'>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BookStatistic;