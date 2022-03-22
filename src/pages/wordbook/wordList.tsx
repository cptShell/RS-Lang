import React, { useEffect, useState } from "react";
import { Card } from "./word";
import { BookPagination } from './bookPagination';
import { PageState, TotalWordData } from "../../utils/interfaces/interfaces";
import { group } from "console";
import { DIFFICULT_GROUP_INDEX, MAX_WORDS_PER_PAGE } from "../../utils/constants/constants";
import ListGames from "./ListGames";

export const WordList = ({learnedCount, mergedDataList, pageState, isAuthorized, setPageState, setMergedDataList}: {
  learnedCount: number,
  mergedDataList: Array<TotalWordData>,
  pageState: PageState,
  isAuthorized: boolean,
  setPageState: (pageState: PageState) => void,
  setMergedDataList: (mergedDataList: null) => void,
}) => {
  const [count, setLearnedCount] = useState(learnedCount);
  const isPageComplete = count === MAX_WORDS_PER_PAGE;
  const isDiffPage = pageState.group === DIFFICULT_GROUP_INDEX;

  return (
    <ul className="d-flex flex-column gap-2">
      {(!isPageComplete && !isDiffPage) && <ListGames pageState={pageState}/>}
      <BookPagination
        isAuthorized={isAuthorized}
        pageState={pageState}
        setPageState={setPageState}
        learnedCount={count}
        setMergedDataList={setMergedDataList}
      />
      {mergedDataList.map((mergedData) => (
        <Card 
          selectedGroup={pageState.group}
          isAuthorized={isAuthorized}
          key={mergedData.wordData.id}
          totalWordData={mergedData}
          learnedCount={count}
          setLearnedCount={setLearnedCount}
        />
      ))}
    </ul>
  );
}