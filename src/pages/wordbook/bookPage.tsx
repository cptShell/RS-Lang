import axios from 'axios';
import React, { useEffect, useState } from "react";
import { STATUS_200 } from '../../redux/constants';
import { BASE_APP_URL, DIFFICULT_GROUP_INDEX, OREDERED_DIFF_LIST } from '../../utils/constants/constants';
import { getUserDifficultWordList, getUserWordsUrl, getWordById, getWordsUrl, linkUserData } from "../../utils/functions/supportMethods";
import { getCurrentUserState } from "../../utils/functions/localStorage"
import { PageState, UserWord, UserWordData, WordData } from "../../utils/interfaces/interfaces";
import { Card } from "./word";

export const BookPage = ({isAuthorized, pageState}: {isAuthorized: boolean, pageState: PageState}): JSX.Element | null => {
  const [wordsData, setWordsData] = useState<Array<WordData> | null>(null);
  const {group, page}: PageState = pageState;

  const getData = async () => {
    if (isAuthorized) {
      const user = getCurrentUserState();
      if (group === DIFFICULT_GROUP_INDEX) {
        const wordList = await getUserDifficultWordList(user);
        setWordsData(wordList);
      } else {
        const unlinkedResponse = await axios({
          url: `${BASE_APP_URL}/users/${user.userId}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=600&filter={"$and":[{"userWord":null}]}`,
          method: 'get',
          headers: {Authorization: `Bearer ${user.token}`}
        });
        const userUnlinkedData: Array<WordData> = unlinkedResponse.data[0].paginatedResults.filter((data: WordData) => data.page === page);

        if (userUnlinkedData.length) await linkUserData(user, userUnlinkedData);
      }
    } else {
      const response = await axios({url: getWordsUrl(pageState), method: 'get'});
      if (response.status === STATUS_200) setWordsData(response.data);
    }
  }

  useEffect(() => {
    getData();
  }, [pageState]);

  return (
    <ul className="d-flex flex-column gap-3">
      {wordsData && wordsData.map((wordData) => (
        <Card isAuthorized={isAuthorized} key={wordData.id} wordData={wordData}/>
      ))}
    </ul>
  );
};
