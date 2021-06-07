import { combineReducers } from 'redux';

import userSlice from './components/Resume/reducers/userSlice';
import reposSlice from './components/Resume/reducers/reposSlice';

const appReducer = combineReducers({
  userData: userSlice,
  reposData: reposSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_SEARCH') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export const resetSearch = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'RESET_USER'});
    dispatch({ type: 'RESET_REPOS'});
  }
};

export default rootReducer;