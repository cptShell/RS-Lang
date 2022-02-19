import exp from "constants";
import { NameGame } from "../enum/enum";

export interface WordData {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  _id: string,
}

export interface UserWord {
  difficulty: string,
  id: string,
  wordId: string,
}

export interface ListQuestionData {
  id: string,
  word: string,
  wordTranslate: string,
  audio: string,
  isRight: boolean,
  rightTranslate: string,
  group: number
}

export interface PageState {
  page: number,
  group: number,
  wordsData?: Array<WordData>,
}

export interface ValuesAuth {
  email: string;
  password: string;
}

export interface ValuesRegistration {
  email: string;
  password: string;
  name: string;
}

export interface ErrorsForm {
  email?: string;
  password?: string;
  name?: string;
}

export interface SprintGameState {
  counter: number;
  score: number;
  level: number;
  factor: number;
  endGame: boolean;
}

export interface DataUserWord {
  difficulty: string;
  optional: OptionalDataWord;
}

interface OptionalDataWord {
  isLearned: boolean;
  isNewWord: boolean;
  isDifficult: boolean;
  countRightAnswer: number;
  countWrongAnswer: number;
}

export interface ResponseUserWords {
  difficulty: string,
  optional: OptionalDataWord,
  wordId: string,
  id: string
}


export interface TotalWordData {
  wordData: WordData,
  userWordData?: ResponseUserWords,
}

export interface listAnswersAudiocall {
  wordTranslate: string;
  isRight: boolean;
}

export interface ListQuestionsAudiocall {
  id: string;
  audio: string;
  word: string;
  wordTranslate: string;
  wordsAnswers: listAnswersAudiocall[];
  rightTranslate: string;
  group: number;
}

export interface DataGame {
  name: NameGame,
  group: string,
  page: string
}