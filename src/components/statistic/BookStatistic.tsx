import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Статистика по учебнику',
    },
  },
};

const labels = ['Учебник'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Количество новых слов за день',
      data: [0],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Количество изученных слов за день',
      data: [0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Процент правильных ответов за день',
      data: [0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const BookStatistic = () => {
  return (
    <div className='col-12'>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BookStatistic;