import axios, { AxiosResponse } from 'axios';
import { STATUS_200 } from '../../redux/constants';
import { UserData } from '../../redux/types/interfaces';
import { BASE_APP_URL } from '../constants/constants';
import { NameGame } from '../enum/enum';
import { ListQuestionData } from '../interfaces/interfaces';
import { getUserWords } from './sprintGameFunctions';

type AveragePercent = {
  counter: number;
  percent: number;
};

interface OptionalStatisticData {
  [nameStatistic: string]: {
    percent: AveragePercent;
    seriesRightAnswer: number;
    counterNewWords: number;
  };
}

export interface StatisticData {
  learnedWords: number;
  optional: OptionalStatisticData;
}

const IS_NOT_EXECUTE_STATISTIC_CODE = 404;

const SERIES = 10;

export const getPercentRightAnswer = (allAnswers: ListQuestionData[]) => {
  const rightAnswer = allAnswers.filter((dataWord) => dataWord.isRight);
  const percentRightAnswers = (100 / allAnswers.length) * rightAnswer.length;
  return Math.floor(percentRightAnswers);
};

export const getStatistic = async (
  { userId, token }: UserData,
  controlLoading?: (state: boolean) => void
): Promise<AxiosResponse<StatisticData> | undefined> => {
  try {
    if (controlLoading) {
      controlLoading(true);
    }
    const statistic: AxiosResponse<StatisticData> = await axios({
      url: `${BASE_APP_URL}/users/${userId}/statistics`,
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    });
    return statistic;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Can't get statistics!`);
      return error.response;
    }
  } finally {
    if (controlLoading) {
      controlLoading(false);
    }
  }
};

const setStatistic = async ({ userId, token }: UserData, dataStatistic: StatisticData) => {
  try {
    const response = await axios({
      url: `${BASE_APP_URL}/users/${userId}/statistics`,
      method: 'put',
      data: dataStatistic,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch {
    console.log("Can't set statistics!");
  }
};

const updateStatistic = async (
  userData: UserData,
  currentStatistic: StatisticData,
  listWords: ListQuestionData[],
  newSeriesRightAnswer: number,
  statisticName: keyof OptionalStatisticData
) => {
  const currentUserWordData = await getUserWords(userData);

  let numberNewWords = 0;
  let learnedWord = 0;
  const { counter, percent } = currentStatistic.optional[statisticName].percent;

  if (currentUserWordData) {
    numberNewWords = currentUserWordData.data.filter((dataWord) => dataWord.optional.isNewWord).length;
    learnedWord = currentUserWordData.data.filter((dataWord) => dataWord.optional.isLearned).length;
  }

  const updatedStatistic = {
    learnedWords: learnedWord,
    optional: {
      ...currentStatistic.optional,
      [statisticName]: {
        percent: { counter: counter + 1, percent: percent + getPercentRightAnswer(listWords) },
        seriesRightAnswer:
          (newSeriesRightAnswer > currentStatistic.optional[statisticName].seriesRightAnswer
            ? newSeriesRightAnswer
            : currentStatistic.optional[statisticName].seriesRightAnswer),
        counterNewWords:
          currentStatistic.optional[statisticName].counterNewWords +
          (numberNewWords - currentStatistic.optional[statisticName].counterNewWords),
      },
    },
  };

  await setStatistic(userData, updatedStatistic);
};

export const getInitialStatisticData = async (
  userData: UserData,
  allAnswers: ListQuestionData[],
  seriesRightAnswer: number,
  statisticName: keyof OptionalStatisticData
): Promise<void> => {
  const currentUserWordData = await getUserWords(userData);
  const currentStatistic = await getStatistic(userData);
  let counterNewWords = 0;
  let learnedWords = 0;
  if (currentUserWordData) {
    counterNewWords = currentUserWordData.data.filter((dataWord) => dataWord.optional.isNewWord).length;
    learnedWords = currentUserWordData.data.filter((dataWord) => dataWord.optional.isLearned).length;
  }
  const percent: AveragePercent = { counter: 1, percent: getPercentRightAnswer(allAnswers) };
  const newStatistic = { learnedWords, optional: { [statisticName]: { percent, seriesRightAnswer, counterNewWords } } };
  if (currentStatistic?.status === STATUS_200) {
    Object.assign(newStatistic.optional, currentStatistic.data.optional);
  }
  await setStatistic(userData, newStatistic);
};

export const addStatisticUser = async (listWords: ListQuestionData[], userData: UserData, nameStatistic: NameGame) => {
  try {
    const currentStatistic = await getStatistic(userData);
    if (currentStatistic?.status === IS_NOT_EXECUTE_STATISTIC_CODE || !currentStatistic?.data.optional[nameStatistic]) {
      await getInitialStatisticData(userData, listWords, SERIES, nameStatistic);
    } else if (currentStatistic?.status === STATUS_200) {
      await updateStatistic(userData, currentStatistic.data, listWords, SERIES, nameStatistic);
    }
  } catch {
    console.log(`Can't add statistics data!`);
  }
};
