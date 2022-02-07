import React from 'react';
import { PageState } from '../../utils/interfaces/inerface';
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
    <ul className='pagination d-flex justify-content-center'>
      <li className='page-item' onClick={() => changePage(-1)}>
        <button className='page-link'>prev</button>
      </li>
      <li className='page-item inactive'>
        <span className='page-link inactive'>{page + 1}</span>
      </li>
      <li className='page-item' onClick={() => changePage(1)}>
        <button className='page-link'>next</button>
      </li>
    </ul>
  );
} ;