import { useReducer } from 'react';
import { usePersistentReducer } from 'hooks/usePersistentReducer';
import { initialAppState } from './initialAppState';

const useGlobalState = () => {
  const [globalState, globalDispatch] = usePersistentReducer();

  return { globalState, globalDispatch };
};

export default useGlobalState;
