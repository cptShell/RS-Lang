import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDataUser } from '../redux/actions/usersCreator';
import { DEFAULT_STATUS_USER_DATA, resetStorage } from '../utils/functions/localStorage';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerLogout = () => {
    dispatch(setDataUser(DEFAULT_STATUS_USER_DATA));
    resetStorage();
    navigate('/');
  };

  return <button onClick={handlerLogout}>Выйти</button>;
};

export default Logout;
