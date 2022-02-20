import React, { useState } from 'react';
import { MESSAGE_IS_AUTH } from '../utils/constants/constants';
import { BookPage } from './wordbook/bookPage';
import { BookPagination } from './wordbook/bookPagination';
import { GroupList } from './wordbook/groupList';
import { store } from '../redux/store';
import ListGames from './wordbook/ListGames';

const Book = (): JSX.Element => {
  const [pageState, setPageState] = useState({page: 0, group: 0});
  const isAuthorized: boolean = store.getState().userData.message === MESSAGE_IS_AUTH;

  return ( 
    <BookPage isAuthorized={isAuthorized} pageState={pageState} setPageState={setPageState}/>
  );
};

export default Book;
