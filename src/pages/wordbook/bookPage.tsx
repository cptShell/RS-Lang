import axios from 'axios';
import React, { useEffect, useState } from "react";
import { STATUS_200 } from '../../redux/constants';
import { DIFFICULT_GROUP_INDEX } from '../../utils/constants/constants';
import { getUserWordsUrl, getWordById, getWordsUrl } from "../../utils/functions/supportMethods";
import { getCurrentUserState } from "../../utils/functions/localStorage"
import { PageState, UserWord, WordData } from "../../utils/interfaces/interfaces";
import { Card } from "./word";

export const BookPage = ({isAuthorized, pageState}: {isAuthorized: boolean, pageState: PageState}): JSX.Element | null => {
  const [wordsData, setWordsData] = useState<Array<WordData> | null>(null);
  const {group}: PageState = pageState;

  const getData = async () => {
    if (isAuthorized && group === DIFFICULT_GROUP_INDEX) {
      const user = getCurrentUserState();
      const url = getUserWordsUrl(user);
      const response = await axios({method: 'get', url, headers: {Authorization: `Bearer ${user.token}`}});
      const wordList = await Promise.all(response.data.map(async (userWord: UserWord) => {
        const url = getWordById(userWord.wordId);
        const response = await axios({method: 'get', url});
        return response.data;
      }));
      setWordsData(wordList);
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
