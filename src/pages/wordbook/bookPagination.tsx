import React from 'react';
import { PageState } from '../../utils/interfaces/interfaces';
import { DIFFICULT_GROUP_INDEX, PAGE_AMOUNT } from '../../utils/constants/constants';

export const BookPagination = ({pageState, setPageState}: {
  pageState: PageState;
  setPageState: (pageState: PageState) => void;
}): JSX.Element => {
  const { page, group }: PageState = pageState;
  const isDifficultGroup: boolean = group === DIFFICULT_GROUP_INDEX;
  const pageItemClassName = 'page-item' + (isDifficultGroup ? ' disabled' : '');

  const changePage = async (direction: number) => {
    if (isDifficultGroup) return;
    const nextPage: number = Math.min(Math.max(0, page + direction), PAGE_AMOUNT);
    const nextState: PageState = {page: nextPage, group};
    setPageState(nextState);
  };

  return (
    <ul className='pagination d-flex justify-content-center'>
      <li className={pageItemClassName} onClick={() => changePage(-1)}>
        <button className='page-link'>prev</button>
      </li>
      <li className='page-item inactive'>
        <span className='page-link inactive'>{page + 1}</span>
      </li>
      <li className={pageItemClassName} onClick={() => changePage(1)}>
        <button className='page-link'>next</button>
      </li>
    </ul>
  );
} ;