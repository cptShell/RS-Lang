import { ListQuestionData, WordData } from "../interfaces/interfaces";

export const ACTIVE_CLASSNAME = 'active';
export const BASE_APP_URL: string = 'https://a-c-rslang.herokuapp.com';
export const MAX_CARDS_PER_PAGE: number = 30;
export const PAGE_AMOUNT: number = 30;
export const BASIC_GROUP_AMOUNT: number = 6;
export const DIFFICULT_GROUP_INDEX: number = 6;
export const ORDERED_BTN_STYLE_LIST: Array<string> = [
  'success',
  'success',
  'warning',
  'warning',
  'danger',
  'danger',
  'danger',
];
export const OREDERED_DIFF_LIST: Array<string> = [
  'easy',
  'easy',
  'normal',
  'normal',
  'hard',
  'hard',
]
export const REG_EXP_EMAIL = /\S+@\S+\.\S+/;
export const MESSAGE_IS_AUTH = 'Authenticated';
export const START_LEVEL = 1;
export const MIN_LEVEL = 3;
export const AVERAGE_LEVEL = 6;
export const MAX_LEVEL = 9;
export const MIN_FACTOR = 10;
export const ELEMENTARY_FACTOR = 20;
export const AVERAGE_FACTOR = 40;
export const MAX_FACTOR = 80;

export const DEFAULT_SPRINT_GAME_STATE = {
  counter: 0,
  score: 0,
  level: START_LEVEL,
  maxLevel: START_LEVEL,
  factor: MIN_FACTOR,
  endGame: false,
};
export const MAX_NUMBER_PAGES = 3;
export const MIN_PAGE = 0;
export const MAX_PAGE = 29;
export const DELAY_SECOND = 1000;
export const INIT_TIMER_SPRINT_GAME = 60;
export const LEFT_KEY = 'ArrowLeft';
export const RIGHT_KEY = 'ArrowRight';
export const SPACE_KEY = 'Space';
export const ENTER_KEY = 'Enter';
export const NUMPAD_ENTER_KEY = 'NumpadEnter';
export const DATA_IS_EXIST_CODE = 417; 

export const SPRINT_LEVEL_DATA = [
  {
    level: 0,
    nameLevel: 'Beginner'
  },
  {
    level: 1,
    nameLevel: 'Elementary'
  },
  {
    level: 2,
    nameLevel: 'Pre-Intermediate'
  },
  {
    level: 3,
    nameLevel: 'Intermediate'
  },
  {
    level: 4,
    nameLevel: 'Upper-Intermediate'
  },
  {
    level: 5,
    nameLevel: 'Advanced'
  },
];
export const NUMBER_RIGHT_ANSWER = 3;

export const DEFAULT_QUESTIONS_SPRINT_GAME: ListQuestionData = {
  id: '',
  word: '',
  wordTranslate: '',
  audio: '',
  isRight: false,
  rightTranslate: '',
  group: 0
}

export const MIN_NUMBER_WORD = 0;
export const MAX_NUMBER_WORD = 9;
export const NUMBER_WORDS_GAME = 10;
export const MIN_INDEX = 0;
export const RIGHT_ANSWER_SCORE = 10;
export const MIN_NUMBER_KEY = 1;
export const MAX_NUMBER_KEY = 5;

export const MAX_ANSWER_AUDIOCALL_GAME = 5;

export const INIT_GROUP = '0';
export const INIT_PAGE = '0';