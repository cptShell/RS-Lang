export const ACTIVE_CLASSNAME = 'active';
export const BASE_APP_URL: string = 'https://a-c-rslang.herokuapp.com';
export const MAX_CARDS_PER_PAGE: number = 30;
export const PAGE_AMOUNT: number = 30;
export const BASIC_GROUP_AMOUNT: number = 6;
export const ORDERED_BTN_STYLE_LIST: Array<string> = [
  'success', 'success', 
  'warning', 'warning', 
  'danger', 'danger', 'danger'
];
export const REG_EXP_EMAIL = /\S+@\S+\.\S+/;
export const MESSAGE_IS_AUTH = 'Authenticated';
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
  level: 0,
  factor: MIN_FACTOR,
  endGame: false,
};