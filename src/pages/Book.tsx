import React, { useState } from 'react';
import { BASE_APP_URL, MESSAGE_IS_AUTH } from '../utils/constants/constants';
import { BookPage } from './wordbook/bookPage';
import { BookPagination } from './wordbook/bookPagination';
import { GroupList } from './wordbook/groupList';

const Book = (): JSX.Element => {
  const [pageState, setPageState] = useState({page: 0, group: 0});
  const storageData = JSON.parse(localStorage.getItem('rs-lang_RSS_22_Q3-STORAGE_ID-277') as string);
  const isAuthorized: boolean = storageData.message === MESSAGE_IS_AUTH;
  
  return ( 
    <div className='container-fluid d-flex flex-column gap-2 p-2'>
      <BookPagination pageState={pageState} setPageState={setPageState}/>
      <GroupList isAuthorized={isAuthorized} pageState={pageState} setPageState={setPageState}/>
      <BookPage isAuthorized={isAuthorized} pageState={pageState}/>
    </div>
  );
};

export default Book;
