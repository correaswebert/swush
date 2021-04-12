import { useReducer } from 'react';
import { globalStateArgs } from './globalStateArgs';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        jwt: localStorage.getItem('jwt'),
      };

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        jwt: null,
      };

    case 'GOT_TEAM':
      return {
        ...state,
        teams: action.payload,
      };

    default:
      return state;
  }
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, globalStateArgs);

  return { globalState, globalDispatch };
};

export default useGlobalState;
