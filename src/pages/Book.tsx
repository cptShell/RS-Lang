import React, { useState } from 'react';
import { BookPage } from './wordbook/bookPage';
import { BookPagination } from './wordbook/bookPagination';
import { GroupList } from './wordbook/groupList';

const Book = (): JSX.Element => {
  const [pageState, setPageState] = useState({page: 0, group: 0});

  return ( 
    <div>
      <BookPagination pageState={pageState} setPageState={setPageState}/>
      <GroupList pageState={pageState} setPageState={setPageState}/>
      <BookPage pageState={pageState}/>
    </div>
  );
};

export default Book;
