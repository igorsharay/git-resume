import { getData } from "../../utils/helper";

const initialState = {
  repos: [],
  reposPageNumber: 1,
  isReposLoading: false,
  reposLoadingError: {}
};

export default function reposReducer(state = initialState, action) {
  switch (action.type) {
    case 'REPOS_DATA_LOADED':
      return {
        ...state,
        repos: [
          ...state.repos,
          ...action.payload
        ]
      };
    
    case 'REPOS_DATA_LOADING':
      return {
        ...state,
        isReposLoading: action.payload
      };
    
    case 'REPOS_DATA_LOADING_ERROR':
      return {
        ...state,
        userLoadingError: action.payload
      };
    
    case 'REPOS_PAGE_INCREMENTED':
      return {
        ...state,
        reposPageNumber: state.reposPageNumber + 1
      };
    
    case 'RESET_REPOS':
      return initialState;
  
    default:
      return state;
  }
}

export function fetchReposData(reposUrl, page) {
  return async (dispatch, getState) => {

    dispatch({ type: 'REPOS_DATA_LOADING', payload: true });

    // ajax request here
    const reposResponse = await getData(
      `${reposUrl}?visibility=public&affiliation=owner&sort=updated&direction=desc&per_page=100&page=${page}`
    );

    if (reposResponse.ok) {
      dispatch({ type: 'REPOS_DATA_LOADING', payload: false });

      if (reposResponse.data) {
        dispatch({ type: 'REPOS_DATA_LOADED', payload: reposResponse.data });

        if (reposResponse.data.length === 100) {
          dispatch({ type: 'REPOS_PAGE_INCREMENTED'});
        }
      }
    } else {
      dispatch({type: 'REPOS_DATA_LOADING_ERROR', payload: {
        status: reposResponse.status,
        message: reposResponse.data?.message,
      }});
    }
  }
}