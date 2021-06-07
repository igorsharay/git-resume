import { getData } from "../../utils/helper";

const initialState = {
  user: {},
  isUserLoading: false,
  userLoadingError: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_DATA_LOADED':
      return {
        ...state,
        user: action.payload
      };
    
    case 'USER_DATA_LOADING':
      return {
        ...state,
        isUserLoading: action.payload
      };
    
    case 'USER_DATA_LOADING_ERROR':
      return {
        ...state,
        userLoadingError: action.payload
      };
    
    case 'RESET_USER':
      return initialState;
  
    default:
      return state;
  }
}

export function fetchUserData(username) {
  return async (dispatch, getState) => {

    dispatch({ type: 'USER_DATA_LOADING', payload: true });
    // ajax request here
    const userResponse = await getData(
      `https://api.github.com/users/${username}`
    );

    if (userResponse.ok) {
      dispatch({ type: 'USER_DATA_LOADING', payload: false });

      if (userResponse.data) {
        dispatch({ type: 'USER_DATA_LOADED', payload: userResponse.data });
      }      
    } else {
      dispatch({ type: 'USER_DATA_LOADING', payload: false });
      dispatch({type: 'USER_DATA_LOADING_ERROR', payload: {
        status: userResponse.status,
        message: userResponse.data?.message,
      }});
    }
  }
}