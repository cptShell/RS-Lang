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
    name: 'Auth',
    component: <Auth />,
  },
  {
    route: '/',
    name: 'Main',
    component: <Main />,
  },
  {
    route: '/book',
    name: 'Book',
    component: <Book />,
  },
  {
    route: '/audiocall',
    name: 'Audiocall',
    component: <Audiocall />,
  },
  {
    route: '/sprint',
    name: 'Sprint',
    component: <Sprint />,
  },
  {
    route: '/statistics',
    name: 'Statistics',
    component: <Statistics />,
  },
  {
    route: '*',
    component: <Error />,
    hideInListNav: true,
  },
];
