import React from 'react';
import { useEffect, useContext, useState } from 'react';
import Context from 'store/context';
import { makeStyles } from '@material-ui/core/styles';
import CardView from 'components/cardView';
import GlobalContext from 'store/context';

const DataList = ({ data }) => {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [info, setInfo] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    if (!globalState.secretDes) return null;

    const ssh = globalState.secretDes.SSH;
    const oauth = globalState.secretDes.OAuth;
    const pass = globalState.secretDes.Password;
    const sshDes = globalState.secretDes.sshDescription;
    const oauthDes = globalState.secretDes.oauthDescription;
    const passDes = globalState.secretDes.passwordDescription;

    const allSecrets = [...ssh, ...oauth, ...pass];
    const allDes = [...sshDes, ...oauthDes, ...passDes];

    setInfo(allSecrets);
    setTitle(allDes);
    console.log(globalState.secretIndex);
  }, [globalState.toggle]);

  return (
    <CardView
      data={info[globalState.secretIndex]}
      title={title[globalState.secretIndex]}
    />
  );
};

export default DataList;
