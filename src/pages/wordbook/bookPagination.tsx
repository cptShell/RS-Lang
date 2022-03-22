import React from 'react';
import { PageState } from '../../utils/interfaces/interfaces';
import { DIFFICULT_GROUP_INDEX, MAX_WORDS_PER_PAGE, PAGE_AMOUNT } from '../../utils/constants/constants';
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

  const isCompletePage = MAX_WORDS_PER_PAGE === learnedCount;
  const pageStatusBg: string = isCompletePage ? 'learned' : '';

  return (
    !isDifficultGroup ?
    (
      <div className='d-flex justify-content-between'>
        <ul className='pagination d-flex justify-content-center align-items-center w-100'>
          <li className={pageItemClassName} onClick={() => changePage(-1)}>
            <button className='page-link'>prev</button>
          </li>
          <li className={`page-item inactive w-100`}>
            <div className={`d-flex page-link inactive justify-content-center ${pageStatusBg}`}>
              {isCompletePage && <span className="material-icons text-success">star</span>}
              Страница {page + 1}
              {(isAuthorized && group !== DIFFICULT_GROUP_INDEX) && <PageStatus learnedCount={learnedCount}/>}
              {isCompletePage && <span className="material-icons text-success">star</span>}
            </div>
          </li>
          <li className={pageItemClassName} onClick={() => changePage(1)}>
            <button className='page-link'>next</button>
          </li>
        </ul>
      </div>
    ) : (
      <div className='d-flex justify-content-center w-100'>
        <span>Вы на странице со сложными словами</span>
      </div>
    )
  );
} ;