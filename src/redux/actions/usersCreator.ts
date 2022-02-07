import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { setLocalStorage } from '../../utils/functions/localStorage';
import { ValuesAuth, ValuesRegistration } from '../../utils/interfaces/interfaces';
import { BASE_HEADERS, SET_DATA_USER, STATUS_200 } from '../constants';
import { UserData } from '../types/interfaces';
import { ActionSetDataUser } from '../types/types';

export const setDataUser = (data: UserData): ActionSetDataUser => ({ type: SET_DATA_USER, payload: data });

export function asyncSignInUser(values: ValuesAuth, controlButton?: (state: boolean) => void) {
  return async function (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) {
    if (controlButton) controlButton(true);
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_APP_URL}/signin`,
        data: values,
        headers: BASE_HEADERS,
      });
      if (response.status === STATUS_200) {
        dispatch(setDataUser(response.data));
        setLocalStorage(response.data);
      }
    } catch {
      console.error('Can\'t sign in');
    } finally {
      if (controlButton) controlButton(false);
    }
  };
}

export function asyncCreateUser(controlButton: (state: boolean) => void, values: ValuesRegistration) {
  return async function (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) {
    controlButton(true);
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_APP_URL}/users`,
        data: values,
        headers: BASE_HEADERS,
      });
      if (response.status === STATUS_200) {
        dispatch(asyncSignInUser({ email: values.email, password: values.password }));
      }
    } catch {
      console.error('Can\'t create user');
    } finally {
      controlButton(false);
    }
  };
}
