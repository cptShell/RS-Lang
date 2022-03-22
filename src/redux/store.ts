import { combineReducers, createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from './reducers/usersReducer';
import audiocallReducer from './reducers/audiocallReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userData: usersReducer,
  audiocall: audiocallReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof store.getState>;
