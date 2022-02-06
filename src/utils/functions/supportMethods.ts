import { BASE_APP_URL } from "../constants/constants";

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

export const createWordsUrl = (page: number, group: number) => {
  return `${BASE_APP_URL}/words?group=${group}&page=${page}`;
}