import React, { useEffect, useState } from "react";
import { Card } from "./word";
import { BookPagination } from './bookPagination';
import { PageState, TotalWordData } from "../../utils/interfaces/interfaces";
import { group } from "console";
import { DIFFICULT_GROUP_INDEX } from "../../utils/constants/constants";

export const WordList = ({learnedCount, mergedDataList, pageState, isAuthorized, setPageState, setMergedDataList}: {
  learnedCount: number,
  mergedDataList: Array<TotalWordData>,
  pageState: PageState,
  isAuthorized: boolean,
  setPageState: (pageState: PageState) => void,
  setMergedDataList: (mergedDataList: null) => void,
}) => {
  const [count, setLearnedCount] = useState(learnedCount);

  return (
    <ul className="d-flex flex-column gap-3">
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