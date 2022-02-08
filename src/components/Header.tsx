import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../components/Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { listRoutes } from '../routes/routes';
import { toggleActiveClassName } from '../utils/functions/toggleActiveClass';
import { MESSAGE_IS_AUTH } from '../utils/constants/constants';

const Header: React.FC = () => {
  const {
    userData: { name, message },
  } = useSelector((state: RootState) => state);
  const linkList = listRoutes.map((routeData) => {
    if (routeData.hideInListNav) {
      return;
    }
    if (routeData.isGuest && message === MESSAGE_IS_AUTH) {
      return (
        <li key={routeData.route}>
          <Logout />
        </li>
      );
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
      <span>{name}</span>
      <nav>
        <ul className='nav-links'>{linkList}</ul>
      </nav>
    </header>
  );
};

export default Header;
