import { getCurrentUserState } from '../../utils/functions/localStorage';
import { ActionSetDataUser } from '../types/types';
import { SET_DATA_USER } from '../constants';

export default function usersReducer(state = getCurrentUserState(), action: ActionSetDataUser) {
  switch (action.type) {
    case SET_DATA_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
