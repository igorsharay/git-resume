import { combineReducers } from 'redux';

import userSlice from './components/Resume/reducers/userSlice';
import reposSlice from './components/Resume/reducers/reposSlice';

const appReducer = combineReducers({
  userData: userSlice,
  reposData: reposSlice
});

export const resetSearch = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'RESET_USER'});
    dispatch({ type: 'RESET_REPOS'});
  }
};

export default appReducer;