import React from 'react';
import Main from '../pages/Main';
import Auth from '../pages/Auth';
import Book from '../pages/Book';
import Audiocall from '../pages/Audiocall';
import Sprint from '../pages/Sprint';
import Statistics from '../pages/Statistics';
import Error from '../pages/Error';
import { RouteData } from '../utils/types/types';

export const listRoutes: RouteData[] = [
  {
    route: '/auth',
    name: 'Войти',
    isGuest: true,
    component: <Auth />,
  },
  {
    route: '/',
    name: 'Главная',
    component: <Main />,
  },
  {
    route: '/book',
    name: 'Учебник',
    component: <Book />,
  },
  {
    route: '/audiocall',
    name: 'Аудиовызов',
    component: <Audiocall />,
    hideInListNav: true,
  },
  {
    route: '/sprint',
    name: 'Спринт',
    component: <Sprint />,
    hideInListNav: true,
  },
  {
    route: '/statistics',
    name: 'Статистика',
    component: <Statistics />,
  },
  {
    route: '*',
    component: <Error />,
    hideInListNav: true,
  },
];
