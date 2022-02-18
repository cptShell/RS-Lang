import React from 'react';
import { PageState, TotalWordData } from '../../utils/interfaces/interfaces';
import { DIFFICULT_GROUP_INDEX, PAGE_AMOUNT } from '../../utils/constants/constants';
import { PageStatus } from './pageStatus';

export const BookPagination = ({pageState, setPageState, isAuthorized, learnedCount, setMergedDataList}: {
  pageState: PageState;
  setPageState: (pageState: PageState) => void,
  isAuthorized: boolean,
  learnedCount: number,
  setMergedDataList: (mergedDataList: null) => void,
}): JSX.Element => {
  const { page, group }: PageState = pageState;
  const isDifficultGroup: boolean = group === DIFFICULT_GROUP_INDEX;
  const pageItemClassName = 'page-item' + (isDifficultGroup ? ' disabled' : '');

  const changePage = async (direction: number) => {
    if (isDifficultGroup) return;
    const nextPage: number = Math.min(Math.max(0, page + direction), PAGE_AMOUNT);
    const nextState: PageState = {page: nextPage, group};
    setPageState(nextState);
    setMergedDataList(null);
  };

  let pageStatusComponent: JSX.Element;
  if (isAuthorized && group !== DIFFICULT_GROUP_INDEX) {
    pageStatusComponent = (<span></span>);
  }

  return (
    <div className='d-flex justify-content-between'>
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
      {isAuthorized && <PageStatus learnedCount={learnedCount}/>}
    </div>
  );
} ;