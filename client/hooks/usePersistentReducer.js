import { useReducer } from 'react';
import { initialAppState } from 'store/initialAppState';

function init(initialValues) {
  const initialState = initialValues;

  try {
    for (const key in initialValues) {
      const index = sessionStorage.getItem(key) ?? initialValues[key];
      initialState[key] = parseInt(index);
    }
  } catch (error) {
    // console.log(error);
  }

  try {
    const storedJwt = localStorage.getItem('jwt');
    initialState['jwt'] = storedJwt ?? null;
    initialState['isLoggedIn'] = storedJwt ? true : false;
  } catch (error) {
    initialState['jwt'] = null;
    initialState['isLoggedIn'] = false;
  }

  return initialState;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        jwt: localStorage.getItem('jwt'),
      };

    case 'LOGOUT':
      localStorage.clear();
      sessionStorage.clear();
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

    case 'SELECT_TEAM':
      // sessionStorage.setItem('teamIndex', action.payload);
      return {
        ...state,
        teamIndex: action.payload,
      };

    case 'SELECT_SECRET':
      // sessionStorage.setItem('secretIndex', action.payload);
      return {
        ...state,
        secretIndex: action.payload,
      };

    default:
      return state;
  }
};

export function usePersistentReducer() {
  const [state, dispatch] = useReducer(reducer, initialAppState, init);

  // const setValue = (value) => {
  //   try {
  //     dispatch(value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return [state, dispatch];
}
