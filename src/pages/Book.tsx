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
    <div className='container-fluid d-flex flex-column gap-2 p-2'>
      <div className='d-flex flex-wrap flex-row justify-content-between gap-2'>
        <BookPagination pageState={pageState} setPageState={setPageState}/>
        <ListGames pageState={pageState} />
        <GroupList isAuthorized={isAuthorized} pageState={pageState} setPageState={setPageState}/>
      </div>
      <BookPage isAuthorized={isAuthorized} pageState={pageState}/>
      <div className='d-flex flex-wrap flex-row justify-content-between gap-2'>
        <BookPagination pageState={pageState} setPageState={setPageState}/>
        <GroupList isAuthorized={isAuthorized} pageState={pageState} setPageState={setPageState}/>
      </div>
    </div>
  );
};

export default Book;
