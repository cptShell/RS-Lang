import axios from "axios";
import { UserData } from "../../redux/types/interfaces";
import { BASE_APP_URL } from "../constants/constants";
import { PageState, WordData } from "../interfaces/interfaces";

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

export const getUserWordsUrl = (user: UserData, wordData?: WordData) => {
  const postfix: string = wordData ? `/${wordData.id}` : '';
  return `${BASE_APP_URL}/users/${user.userId}/words${postfix}`;
}