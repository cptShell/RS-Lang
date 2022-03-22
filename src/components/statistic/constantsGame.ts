export const labels = ['Аудиовызов', 'Спринт'];
export const RED_COLOR = 'rgba(255, 99, 132, 0.5)';
export const YELLOW_COLOR = 'rgba(196, 196, 0, 0.5)';
export const GREEN_COLOR = 'rgba(3, 143, 59, 0.5)';
export const OPTIONS_GAME_STATISTIC = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Статистика по мини-играм',
    },
  },
};
export const INIT_STATISTIC_GAME = {
  labels,
  datasets: [
    {
      label: 'Проценты правильный ответов',
      data: [0, 0],
      backgroundColor: YELLOW_COLOR,
    },
    {
      label: 'Новых слов за день',
      data: [0, 0],
      backgroundColor: YELLOW_COLOR,
    },
    {
      label: 'Серия правильных ответов',
      data: [0, 0],
      backgroundColor: YELLOW_COLOR,
    },
  ],
};
