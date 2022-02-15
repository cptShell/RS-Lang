import axios from 'axios';
import {
  BASE_APP_URL,
  MAX_ANSWER_AUDIOCALL_GAME,
  MAX_NUMBER_WORD,
  MAX_PAGE,
  MIN_INDEX,
  MIN_NUMBER_WORD,
  MIN_PAGE,
  NUMBER_WORDS_GAME,
} from '../constants/constants';
import { listAnswersAudiocall, ListQuestionsAudiocall, WordData } from '../interfaces/interfaces';
import { getRandomNumber, shuffleArray } from './sprintGameFunctions';

const getAllAnswers = (listAnswers: listAnswersAudiocall[], words: string[]) => {
  while (true) {
    const randomIndex = getRandomNumber(MIN_INDEX, words.length - 1);
    const wrongAnswer: listAnswersAudiocall = { wordTranslate: words[randomIndex], isRight: false };
    if (!listAnswers.find((answer) => answer.wordTranslate === wrongAnswer.wordTranslate)) {
      listAnswers.push(wrongAnswer);
    }
    if (listAnswers.length === MAX_ANSWER_AUDIOCALL_GAME) break;
  }
  return shuffleArray(listAnswers);
};

export const getListRightWrongAnswers = async (listQuestions: ListQuestionsAudiocall[], numberGroup: string) => {
  const page = getRandomNumber(MIN_PAGE, MAX_PAGE);
  const randomWords = await axios.get<WordData[]>(`${BASE_APP_URL}/words/?group=${numberGroup}&page=${page}`);

  return listQuestions.map((wordData) => {
    wordData.wordsAnswers = getAllAnswers(
      wordData.wordsAnswers,
      randomWords.data.map((wordData) => wordData.wordTranslate)
    );
    return wordData;
  });
};

export const getListAnswersAudiocall = async (listWords: WordData[], numberGroup: string) => {
  const startNumberWord = getRandomNumber(MIN_NUMBER_WORD, MAX_NUMBER_WORD);
  const endNumberWord = startNumberWord + NUMBER_WORDS_GAME;
  const initListWords: ListQuestionsAudiocall[] = listWords
    .slice(startNumberWord, endNumberWord)
    .map((wordData) => ({
      id: wordData.id,
      word: wordData.word,
      audio: wordData.audio,
      wordTranslate: wordData.wordTranslate,
      rightTranslate: wordData.wordTranslate,
      group: Number(numberGroup),
      wordsAnswers: [{ wordTranslate: wordData.wordTranslate, isRight: true }],
    }));
  const listAnswers = await getListRightWrongAnswers(initListWords, numberGroup);
  return Promise.resolve(listAnswers);
};
