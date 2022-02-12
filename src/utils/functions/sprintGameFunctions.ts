import axios, { AxiosError } from 'axios';
import { BASE_HEADERS } from '../../redux/constants';
import {
  AVERAGE_FACTOR,
  AVERAGE_LEVEL,
  BASE_APP_URL,
  DATA_IS_EXIST_CODE,
  ELEMENTARY_FACTOR,
  MAX_FACTOR,
  MAX_LEVEL,
  MAX_NUMBER_PAGES,
  MAX_PAGE,
  MIN_FACTOR,
  MIN_LEVEL,
  MIN_PAGE,
} from '../constants/constants';
import { TypeDifficultyWord, TypeMethodRequest } from '../enum/enum';
import { ListQuestionData, WordData } from '../interfaces/interfaces';

const getRandomNumberPages = (): Array<string> => {
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
    const { word, wordTranslate, id, audio, group } = wordData;
    return { word, wordTranslate, id, audio, group, rightTranslate: wordTranslate, isRight: true };
  });
  const rightWrongAnswer = getListRightWrongAnswer(initListsWords);
  const listQuestions = shuffleArray(rightWrongAnswer);
  return listQuestions;
};

export const getFactorScore = (level: number): number => {
  if (level > MIN_LEVEL && level <= AVERAGE_LEVEL) {
    return ELEMENTARY_FACTOR;
  }
  if (level > AVERAGE_LEVEL && level <= MAX_LEVEL) {
    return AVERAGE_FACTOR;
  }
  if (level > MAX_LEVEL) {
    return MAX_FACTOR;
  }
  return MIN_FACTOR;
};

const getTypeDifficultyWord = (group: number) => {
  switch (group) {
    case 0:
    case 1:
      return TypeDifficultyWord[0];
    case 2:
    case 3:
      return TypeDifficultyWord[1];
    case 4:
    case 5:
      return TypeDifficultyWord[2];
  }
};

const createUpdateUserWord = async (
  typeMethods: TypeMethodRequest,
  wordData: ListQuestionData,
  userToken: string,
  userId: string
) => {
  try {
    const response = await axios({
      url: `${BASE_APP_URL}/users/${userId}/words/${wordData.id}`,
      method: typeMethods,
      data: {
        difficulty: getTypeDifficultyWord(wordData.group),
        optional: { isLearned: true, isRightWrongAnswer: wordData.isRight },
      },
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
  }
};

const getUserWords = async (userToken: string, userId: string) => {
  const response = await axios({
    url: `${BASE_APP_URL}/users/${userId}/words`,
    method: 'get',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response;
}

export const addDataAboutWordsToUserWords = (listWords: ListQuestionData[], userToken: string, userId: string) => {
  listWords.map(async (wordData) => {
    try {
      const response = await createUpdateUserWord(TypeMethodRequest.POST, wordData, userToken, userId);
      if (response?.status === DATA_IS_EXIST_CODE) {
        const words = await getUserWords(userToken, userId);
        console.log('words ', words);
        
        await createUpdateUserWord(TypeMethodRequest.PUT, wordData, userToken, userId);
      }
    } catch {
      console.log('Can\'t add data to user words');
    }
  });
};
