import axios, { AxiosResponse } from 'axios';
import { UserData } from '../../redux/types/interfaces';
import { BASE_APP_URL } from '../constants/constants';
import { ListQuestionData } from '../interfaces/interfaces';
import { getUserWords } from './sprintGameFunctions';

type AveragePercent = {
  counter: number,
  percent: number
}

interface OptionalStatisticData {
  percent: AveragePercent;
  seriesRightAnswer: number;
  counterNewWords: number;
}

interface StatisticData {
  learnedWords: number;
  optional: OptionalStatisticData;
}

const IS_NOT_EXECUTE_STATISTIC_CODE = 404;

const SERIES = 7;

export const getPercentRightAnswer = (allAnswers: ListQuestionData[]) => {
  const rightAnswer = allAnswers.filter((dataWord) => dataWord.isRight);
  const percentRightAnswers = (100 / allAnswers.length) * rightAnswer.length;
  return Math.floor(percentRightAnswers);
};

const getStatistic = async ({ userId, token }: UserData): Promise<AxiosResponse<StatisticData> | undefined> => {
  try {
    const statistic: AxiosResponse<StatisticData> = await axios({
      url: `${BASE_APP_URL}/users/${userId}/statistics`,
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    });
    return statistic;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Can't get statistics!");
      return error.response;
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
    console.log('Can\'t set statistics!');
  }
};

const updateStatistic = async (userData: UserData, currentStatistic: StatisticData, listWords: ListQuestionData[], newSeriesRightAnswer: number) => {
  const currentUserWordData = await getUserWords(userData);

  let numberNewWords = 0;
  let numberLearnedWords = 0;
  const { counter, percent } = currentStatistic.optional.percent;

  if (currentUserWordData) {
    numberNewWords = currentUserWordData.data.filter(dataWord => dataWord.optional.isNewWord).length;
    numberLearnedWords = currentUserWordData.data.filter(dataWord => dataWord.optional.isLearned).length;
  }

  const newStatistic = {
    learnedWords: currentStatistic.learnedWords + numberLearnedWords,
    optional: {
      percent: { counter: counter + 1, percent: percent + getPercentRightAnswer(listWords)},
      seriesRightAnswer: newSeriesRightAnswer > currentStatistic.optional.seriesRightAnswer ? newSeriesRightAnswer : currentStatistic.optional.seriesRightAnswer,
      counterNewWords: currentStatistic.optional.counterNewWords
    }
  }
  await setStatistic(userData, newStatistic);
}

export const getInitialStatisticData = async (userData: UserData, allAnswers: ListQuestionData[], seriesRightAnswer: number): Promise<StatisticData> => {
  const currentUserWordData = await getUserWords(userData);
  let counterNewWords = 0;
  let learnedWords = 0;
  if (currentUserWordData) {
    counterNewWords = currentUserWordData.data.filter(dataWord => dataWord.optional.isNewWord).length;
    learnedWords = currentUserWordData.data.filter(dataWord => dataWord.optional.isLearned).length;
  }
  const percent = {counter: 1, percent: getPercentRightAnswer(allAnswers)};
  return { learnedWords, optional: {percent, seriesRightAnswer, counterNewWords}};
};

export const addStatisticUser = async (listWords: ListQuestionData[], userData: UserData) => {
  try {
    const currentStatistic = await getStatistic(userData);
    if (currentStatistic?.status === IS_NOT_EXECUTE_STATISTIC_CODE) {
      const statisticData = await getInitialStatisticData(userData, listWords, SERIES);
      await setStatistic(userData, statisticData);
    } else if(currentStatistic?.status === 200){
      await updateStatistic(userData, currentStatistic.data, listWords, SERIES);
    }
  } catch {
    console.log('Can\'t add statistics data!');
  }
  const stat = await getStatistic(userData);
  console.log(stat);
  
};