import { userReducer } from './user/user.slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
