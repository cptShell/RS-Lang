import { UserData } from '../../redux/types/interfaces';
const STORAGE_NAME = 'rs-lang-user_RSS_22_Q3-STORAGE';
export const DEFAULT_STATUS_USER_DATA = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: 'Guest',
};

const isStorageNotExist = (): boolean => {
  return window.localStorage.getItem(STORAGE_NAME) === null;
};

export const setLocalStorage = (data: UserData): void => {
  window.localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
};

const getLocalStorage = (): UserData => {
  const data = window.localStorage.getItem(STORAGE_NAME);
  if (data !== null) {
    return <UserData>JSON.parse(data);
  } else {
    throw new Error('Cant get data from local storage');
  }
};

export const getCurrentUserState = () => {
  if (isStorageNotExist()) {
    setLocalStorage(DEFAULT_STATUS_USER_DATA);
  }
  return getLocalStorage();
};

export const resetStorage = () => {
  if (!isStorageNotExist()) {
    setLocalStorage(DEFAULT_STATUS_USER_DATA);
  } else {
    throw new Error('Cant reset local storage');
  }
};
