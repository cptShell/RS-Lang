import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StatisticData } from '../../utils/functions/statistics';
import { GREEN_COLOR, INIT_STATISTIC_GAME, labels, OPTIONS_GAME_STATISTIC, RED_COLOR, YELLOW_COLOR } from './constantsGame';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getStatisticData = (statisticData: StatisticData) => {
  const audiocall = statisticData.optional.audiocall;
  const sprint = statisticData.optional.sprint;
  const data = {
    labels,
    datasets: [
      {
        label: 'Процент правильных ответов',
        data: [0, 0],
        backgroundColor: RED_COLOR,
      },
      {
        label: 'Новых слов за день',
        data: [0, 0],
        backgroundColor: GREEN_COLOR,
      },
      {
        label: 'Серия правильных ответов',
        data: [0, 0],
        backgroundColor: YELLOW_COLOR,
      },
    ],
  };
  if (audiocall) {
    data.datasets[0].data[0] = Math.floor(audiocall.percent.percent / audiocall.percent.counter);
    data.datasets[1].data[0] = audiocall.counterNewWords;
    data.datasets[2].data[0] = audiocall.seriesRightAnswer;
  }
  if (sprint) {
    data.datasets[0].data[1] = Math.floor(sprint.percent.percent / sprint.percent.counter);
    data.datasets[1].data[1] = sprint.counterNewWords;
    data.datasets[2].data[1] = sprint.seriesRightAnswer;
  }
  return data;
};

const Games: React.FC<{ statisticData: StatisticData | undefined }> = ({ statisticData }) => {
  const [data, setData] = useState(INIT_STATISTIC_GAME);
  useEffect(() => {
    if (statisticData) {
      setData(getStatisticData(statisticData));
    }
  }, [statisticData]);  
  return (
    <div className='col-12'>
      <Bar options={OPTIONS_GAME_STATISTIC} data={data} />
    </div>
  );
};

export default Games;
