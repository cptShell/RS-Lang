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
  textExampleTranslate: string
}

export interface UserWord {
  difficult: string,
  id: string,
  wordId: string,
}

export interface ListQuestionData {
  id: string,
  word: string,
  wordTranslate: string,
  audio: string,
  isRight: boolean,
  rightTranslate: string
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

export interface UserWord {
  diffuculty: string,
  options: {
    isLearned: boolean
  }
}

export interface SprintGameState {
  counter: number;
  score: number;
  level: number;
  factor: number;
  endGame: boolean;
}