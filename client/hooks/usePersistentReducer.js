import { useReducer } from 'react';
import { initialAppState } from 'store/initialAppState';

function init(initialValues) {
  const initialState = initialValues;
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

export function usePersistentReducer() {
  const [state, dispatch] = useReducer(reducer, initialAppState, init);

  const setValue = (value) => {
    try {
      dispatch(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue];
}
