import React from 'react';
import { useEffect, useContext, useState } from 'react';
import Context from 'store/context';
import { makeStyles } from '@material-ui/core/styles';
import CardView from 'components/cardView';
import GlobalContext from 'store/context';

const DataList = ({ data }) => {
  const { globalState, globalDispatch } = useContext(GlobalContext);

  // useEffect(() => {
  //   if (!globalState.secretDes) return null;
  //   console.log(globalState.selectedSecret);
  //   console.log(globalState.selectedDes);
  // }, [globalState.selectedSecret]);

  useEffect(() => {
    if (!globalState.selectedSecret) {
      globalDispatch({ type: 'SELECTED_SECRET', payload: 'Your Secret' });
    }
    if (!globalState.selectedDes) {
      globalDispatch({ type: 'SELECTED_DES', payload: 'View your secret here!' });
    }
  }, []);

  return <CardView />;
};

export default DataList;
