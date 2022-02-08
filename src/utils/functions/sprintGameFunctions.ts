import axios from 'axios';
import { BASE_APP_URL } from '../constants/constants';
import { ListQuestionData, WordData } from '../interfaces/interfaces';

const getRandomNumberPages = (): Array<string> => {
  const MAX_NUMBER_PAGES = 3;
  const MIN_PAGE = 0;
  const MAX_PAGE = 29;
  const uniqueNumberPages = new Set<number>();
  while (true) {
    const numberPage = getRandomNumber(MIN_PAGE, MAX_PAGE);
    uniqueNumberPages.add(numberPage);
    if (uniqueNumberPages.size === MAX_NUMBER_PAGES) break;
  }
  return Array.from(uniqueNumberPages).map((number) => number.toString());
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getListWordsByNumberGroup = async (numberGroup: string): Promise<WordData[] | undefined> => {
  try {
    const listRandomPages: Array<string> = getRandomNumberPages();
    const listPageUrls = listRandomPages.map((page) => `${BASE_APP_URL}/words/?group=${numberGroup}&page=${page}`);
    const listRequests = listPageUrls.map((url) => axios.get<WordData>(url));
    const listResponses = await Promise.all(listRequests);
    const listWords = listResponses.map((response) => response.data);
    return listWords.flat();
  } catch {
    console.error("Can't get list words from server");
  }
};

const getListRightWrongAnswer = (listWords: ListQuestionData[]) => {
  const initListWords = listWords.map((wordData) => Object.assign({}, wordData));
  const maxIndex = initListWords.length - 1;
  const rightWrongAnswer = initListWords.map((wordData, index) => {
    if (index % 2 === 0) {
      wordData.isRight = false;
      let randomIndex = getRandomNumber(0, maxIndex);
      while (randomIndex === index) {
        randomIndex = getRandomNumber(0, maxIndex);
      }
      wordData.wordTranslate = listWords[randomIndex].wordTranslate;
    }
    return wordData;
  });
  return rightWrongAnswer;
};

const shuffleArray = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getListQuestionWords = (listWords: WordData[]) => {
  const initListsWords: ListQuestionData[] = listWords.map((wordData) => {
    const { word, wordTranslate, id } = wordData;
    return { word, wordTranslate, id, isRight: true };
  });
  const rightWrongAnswer = getListRightWrongAnswer(initListsWords);
  const listQuestions = shuffleArray(rightWrongAnswer);
  return listQuestions;
};
