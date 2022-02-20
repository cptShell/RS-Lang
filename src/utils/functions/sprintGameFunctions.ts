import axios, { AxiosResponse } from 'axios';
import { UserData } from '../../redux/types/interfaces';
import {
  AVERAGE_FACTOR,
  AVERAGE_LEVEL,
  BASE_APP_URL,
  DATA_IS_EXIST_CODE,
  DEFAULT_QUESTIONS_SPRINT_GAME,
  ELEMENTARY_FACTOR,
  MAX_FACTOR,
  MAX_LEVEL,
  MAX_NUMBER_PAGES,
  MAX_PAGE,
  MIN_FACTOR,
  MIN_LEVEL,
  MIN_PAGE,
  NUMBER_RIGHT_ANSWER,
} from '../constants/constants';
import { TypeDifficultyWord, TypeMethodRequest } from '../enum/enum';
import { DataUserWord, ListQuestionData, ResponseUserWords, WordData } from '../interfaces/interfaces';

const getNumberPages = (numberPage: string): Array<string> => {
  const listPages: Array<number> = [];
  let count = 0;
  let countPage = Number(numberPage);
  while(count < MAX_NUMBER_PAGES) {
    if(countPage >= 0) {
      listPages.push(countPage);
      countPage -= 1;
      count += 1;
    } else {
      break;
    }
  }
  return listPages.map(page => page.toString());
}

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

export const getListWordsByNumberGroup = async (numberGroup: string, numberPage?: string, controlButton?: (state: boolean) => void): Promise<WordData[] | undefined> => {
  try {
    if(controlButton) controlButton(true);
    const listPages: Array<string> = numberPage ? getNumberPages(numberPage) : getRandomNumberPages();
    const listPageUrls = listPages.map((page) => `${BASE_APP_URL}/words/?group=${numberGroup}&page=${page}`);
    const listRequests = listPageUrls.map((url) => axios.get<WordData>(url));
    const listResponses = await Promise.all(listRequests);
    const listWords = listResponses.map((response) => response.data);
    return listWords.flat();
  } catch {
    console.error('Can\'t get list words from server');
  }
  finally{
    if(controlButton) controlButton(false);
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

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getListQuestionWords = (listWords: WordData[]): ListQuestionData[] => {
  if (!listWords.length) {
    return [DEFAULT_QUESTIONS_SPRINT_GAME];
  }
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
    default:
      return TypeDifficultyWord[0];
  }
};

const getDataUserWordById = async (
  wordData: ListQuestionData,
  userData: UserData
): Promise<AxiosResponse<DataUserWord> | undefined> => {
  const { userId, token } = userData;
  try {
    const userWordData = await axios({
      url: `${BASE_APP_URL}/users/${userId}/words/${wordData.id}`,
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    });
    return userWordData;
  } catch {
    console.log('Can\'t get data user word by id');
  }
};

const getOptionalUserDataWord = async (
  typeMethod: TypeMethodRequest,
  wordData: ListQuestionData,
  userData?: UserData
) => {
  if (typeMethod === TypeMethodRequest.POST) {
    return {
      isLearned: false,
      isNewWord: true,
      countRightAnswer: wordData.isRight ? 1 : 0,
      countWrongAnswer: !wordData.isRight ? 1 : 0,
    };
  }
  if (typeMethod === TypeMethodRequest.PUT) {
    if (userData) {
      const currentUserWordData = await getDataUserWordById(wordData, userData);
      if (currentUserWordData) {
        const {
          data: { optional },
        } = currentUserWordData;
        let isWordLearned = optional.countRightAnswer > NUMBER_RIGHT_ANSWER;
        const countWrongAnswer = !wordData.isRight ? optional.countWrongAnswer + 1 : optional.countWrongAnswer;
        if (countWrongAnswer >= 1) {
          isWordLearned = false;
        }
        return {
          isLearned: isWordLearned,
          isNewWord: false,
          countRightAnswer: wordData.isRight ? optional.countRightAnswer + 1 : optional.countRightAnswer,
          countWrongAnswer: countWrongAnswer,
        };
      }
    } else {
      throw new Error('No user data');
    }
  }
};

const createUpdateUserWord = async (typeMethods: TypeMethodRequest, wordData: ListQuestionData, userData: UserData) => {
  const { userId, token } = userData;
  try {
    const dataUserWord = await getOptionalUserDataWord(typeMethods, wordData, userData);
    const response = await axios({
      url: `${BASE_APP_URL}/users/${userId}/words/${wordData.id}`,
      method: typeMethods,
      data: {
        difficulty: getTypeDifficultyWord(wordData.group),
        optional: dataUserWord,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
  }
};

export const addDataAboutWordsToUserWords = (listWords: ListQuestionData[], userData: UserData) => {
  listWords.map(async (wordData) => {
    try {
      const response = await createUpdateUserWord(TypeMethodRequest.POST, wordData, userData);
      if (response?.status === DATA_IS_EXIST_CODE) {
        await createUpdateUserWord(TypeMethodRequest.PUT, wordData, userData);
      }
    } catch {
      console.log('Can\'t add data to user words');
    }
  });
};

export const getUserWords = async (userData: UserData) => {
  try{
    const { userId, token } = userData;
    const response: AxiosResponse<ResponseUserWords[]> = await axios({
      url: `${BASE_APP_URL}/users/${userId}/words`,
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch {
    console.log('Can\'t get user words');
  }
}

export const excludeLearnedWords = async (listWords: WordData[], userData: UserData): Promise<WordData[]> => {
  const listUserWords  = await getUserWords(userData);
  
  if(listUserWords) {
    const { data } = listUserWords;
    const listUserLearnedWordId = data.filter(dataWord => {
      if (dataWord.optional.isLearned) {
        return dataWord.id;
      }
    }).map(dataWord => dataWord.wordId);
    return listWords.filter(wordData => !listUserLearnedWordId.includes(wordData.id));
  }
  return listWords;
}