import axios from "axios";
import { UserData } from "../../redux/types/interfaces";
import { BASE_APP_URL, OREDERED_DIFF_LIST } from "../constants/constants";
import { DataUserWord, PageState, ResponseUserWords, WordData } from "../interfaces/interfaces";

export const playAudioInOrder = (orderedPathCollection: Array<string>): void => {
  const audioOrder: Array<HTMLAudioElement> = orderedPathCollection.map((path, index) => {
    const url = `${BASE_APP_URL}/${path}`;
    const audio = new Audio(url);
    const isLastAudio = index === orderedPathCollection.length - 1;

    if (!isLastAudio) audio.onended = () => audioOrder[index + 1].play();

    return audio;
  });
  audioOrder[0].play();
}

export const getWordById = (id: string) => {
  return `${BASE_APP_URL}/words/${id}`;
}

export const getWordsUrl = (pageState?: PageState) => {
  const postfix: string = pageState ? `?group=${pageState.group}&page=${pageState.page}` : '';
  return `${BASE_APP_URL}/words${postfix}`;
}

export const getUserWordsUrl = (user: UserData, id?: string) => {
  const postfix: string = id ? `/${id}` : '';
  return `${BASE_APP_URL}/users/${user.userId}/words${postfix}`;
}

export const getUserDifficultWordList = async (user: UserData) => {
  const url = getUserWordsUrl(user);
  const response = await axios({method: 'get', url, headers: {Authorization: `Bearer ${user.token}`}});
  const userDataList: Array<ResponseUserWords> = response.data;
  const diffDataList = userDataList.filter(data => data.optional.isDifficult);
  const wordList = await Promise.all(diffDataList.map(async (userWord: ResponseUserWords) => {
    const url = getWordById(userWord.wordId);
    const response = await axios({method: 'get', url});
    return response.data;
  }));
  return wordList;
}

export const linkUserData = async (user: UserData, userUnlinkedData: Array<WordData>) => {
  await Promise.all(userUnlinkedData.map(async (data) => {
    const userWordData: DataUserWord = {
      difficulty: OREDERED_DIFF_LIST[data.group],
      optional: {
        isLearned: false,
        isNewWord: true,
        isDifficult: false,
        countRightAnswer: 0,
        countWrongAnswer: 0,
      },
    }
    await axios({
      method: 'post', 
      url: `${BASE_APP_URL}/users/${user.userId}/words/${data._id}`, 
      headers: {Authorization: `Bearer ${user.token}`},
      data: userWordData,
    });
  }));
}