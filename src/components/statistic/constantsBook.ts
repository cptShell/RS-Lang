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

export const labels = ['Учебник'];
export const YELLOW_COLOR = 'rgba(235, 219, 0, 0.5)';
export const GREEN_COLOR = 'rgba(0, 209, 26, 0.5)';
export const BLUE_COLOR = 'rgba(0, 117, 235, 0.5)';

export const INIT_STATISTIC_DATA = {
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