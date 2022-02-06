import React from 'react';
import { NavLink } from 'react-router-dom';
import { listRoutes } from '../routes/routes';
import { toggleActiveClassName } from '../utils/functions/toggleActiveClass';

const Header: React.FC = () => {
  const linkList = listRoutes.map((routeData) => {
    if (routeData.hideInListNav) {
      return;
    }
    return (
      <li key={routeData.route}>
        <NavLink to={routeData.route} className={toggleActiveClassName}>
          {routeData.name}
        </NavLink>
      </li>
    );
  });
  return (
    <header>
      <nav>
        <ul className='nav-links'>{linkList}</ul>
      </nav>
    </header>
  );
};

export default Header;