import React from 'react';
import { PageState } from '../../utils/interfaces/interfaces';
import { PAGE_AMOUNT } from '../../utils/constants/constants';

export const BookPagination = ({pageState, setPageState}: {
  pageState: PageState;
  setPageState: (pageState: PageState) => void;
}): JSX.Element => {
  const { page, group }: PageState = pageState;

  const changePage = async (direction: number) => {
    const nextPage: number = Math.min(Math.max(0, page + direction), PAGE_AMOUNT);
    const nextState: PageState = {page: nextPage, group};
    setPageState(nextState);
  };

  return (
    <div className='btn-group'>
      <button className='btn' onClick={() => changePage(-1)}>prev</button>
      <span>{page + 1}</span>
      <button className='btn' onClick={() => changePage(1)}>next</button>
    </div>
  );
} ;