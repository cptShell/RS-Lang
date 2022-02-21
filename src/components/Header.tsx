import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../components/Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { listRoutes } from '../routes/routes';
import { MESSAGE_IS_AUTH } from '../utils/constants/constants';

const Header: React.FC = () => {
  const {
    userData: { name, message },
  } = useSelector((state: RootState) => state);
  const getInnerJSX = (name: string) => {
    switch(name) {
      case 'Войти':
        return <span className='material-icons'>login</span>;
      case 'Статистика':
        return <span className='material-icons'>analytics</span>;
      case 'Учебник':
        return <span className='material-icons'>menu_book</span>;
      case 'Главная':
        return <span className='material-icons'>home</span>;
      default:
        return name;
    }
  }

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
        <NavLink to={routeData.route} className='btn btn-success h-100 d-flex align-items-center'>
          {getInnerJSX(routeData.name as string)}
        </NavLink>
      </li>
    );
  });
  return (
    <header className='position-fixed d-flex align-items-center shadow w-100 bg-success px-2 gap-3'>
      <span className='me-auto fs-3 fw-bolder text-white'>RS lang</span>
      <nav>
        <ul className='d-flex flex-row'>{linkList}</ul>
      </nav>
      <div className='d-flex align-items-center gap-2'>
        <span className='fs-6 text-white'>{name}</span>
        <span className='material-icons text-white medium normal'>person</span>
      </div>
    </header>
  );
};

export default Header;
