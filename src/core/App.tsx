import React from 'react';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';
import { listRoutes } from '../routes/routes';

export const App = () => {
  const listPages = listRoutes.map((routeData) => {
    return <Route key={routeData.route} path={routeData.route} element={routeData.component} />;
  });
  return (
    <>
      <Header />
      <div className='main-container'>
        <Routes>{listPages}</Routes>
      </div>
    </>
  );
};
