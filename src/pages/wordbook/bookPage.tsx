import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BASE_APP_URL, DIFFICULT_GROUP_INDEX } from '../../utils/constants/constants';
import { getUserDifficultWordList, getUserWordsUrl, getWordsUrl, linkUserData } from "../../utils/functions/supportMethods";
import { getCurrentUserState } from "../../utils/functions/localStorage"
import { PageState, ResponseUserWords, TotalWordData, WordData } from "../../utils/interfaces/interfaces";
import { WordList } from './wordList';
import { GroupList } from './groupList';
import ListGames from './ListGames';

export const BookPage = ({isAuthorized, pageState, setPageState}: {
  isAuthorized: boolean,
  pageState: PageState,
  setPageState: (pageState: PageState) => void,
}): JSX.Element | null => {
  const [mergedDataList, setMergedDataList] = useState<Array<TotalWordData> | null>(null);
  const {group, page}: PageState = pageState;
  const learnedCount = mergedDataList?.reduce((res, data) => {
    return res + Number(data.userWordData?.optional.isLearned || 0);
  }, 0) || 0;

  const getData = async () => {
    if (isAuthorized) {
      const user = getCurrentUserState();
      if (group === DIFFICULT_GROUP_INDEX) {
        const wordList: Array<WordData> = await getUserDifficultWordList(user);
        const userWordList: Array<ResponseUserWords> = await Promise.all(wordList.map(async (wordData: WordData) => {
          const userWordUrl: string = getUserWordsUrl(user, wordData.id);
          const response = await axios({
            method: 'get',
            url: userWordUrl,
            headers: {Authorization: `Bearer ${user.token}`},
          });
          const userData: ResponseUserWords = response.data;
          return userData;
        }));
        const mergedList: Array<TotalWordData> = wordList.map((word, index) => {return { wordData: word, userWordData: userWordList[index] }});
        setMergedDataList(mergedList);
      } else {
        const unlinkedResponse = await axios({
          url: `${BASE_APP_URL}/users/${user.userId}/aggregatedWords?group=${group}&wordsPerPage=600&filter={"$and":[{"userWord":null}]}`,
          method: 'get',
          headers: {Authorization: `Bearer ${user.token}`}
        });
        
        const userUnlinkedData: Array<WordData> = unlinkedResponse.data[0].paginatedResults.filter((data: WordData) => data.page === page);
        if (userUnlinkedData.length) await linkUserData(user, userUnlinkedData);

        const response = await axios({url: getWordsUrl(pageState), method: 'get'});
        const wordList: Array<WordData> = response.data;
        const userWordList: Array<ResponseUserWords> = await Promise.all(response.data.map(async (wordData: WordData) => {
          const userWordUrl: string = getUserWordsUrl(user, wordData.id);
          const response = await axios({
            method: 'get',
            url: userWordUrl,
            headers: {Authorization: `Bearer ${user.token}`},
          });
          const userData: ResponseUserWords = response.data;
          return userData;
        }));

        const mergedList: Array<TotalWordData> = userWordList.map((userWord, index) => {
          return { wordData: wordList[index], userWordData: userWord };
        });

        setMergedDataList(mergedList);
      }
    } else {
      const response = await axios({url: getWordsUrl(pageState), method: 'get'});
      const wordList: Array<WordData> = response.data;
      const mergedList: Array<TotalWordData> = wordList.map(word => {return { wordData: word }});

      setMergedDataList(mergedList);
    }
  }

  useEffect(() => {
    getData();
  }, [pageState]);

  return (
    mergedDataList && 
    <div className='container-fluid d-flex flex-column gap-2 p-2'>
      <div className='d-flex flex-wrap flex-row justify-content-between gap-2'>
        <ListGames pageState={pageState} />
        <GroupList
          isAuthorized={isAuthorized}
          pageState={pageState}
          setPageState={setPageState}
          setMergedDataList={setMergedDataList}
        />
      </div>
      <WordList 
        learnedCount={learnedCount}
        mergedDataList={mergedDataList}
        pageState={pageState}
        isAuthorized={isAuthorized}
        setPageState={setPageState}
        setMergedDataList={setMergedDataList}
      />
    </div>

  );
};
