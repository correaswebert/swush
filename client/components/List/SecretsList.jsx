import LazyList from './Lazy';
import React from 'react';
import { useEffect, useContext, useState } from 'react';
import GlobalContext from 'store/context';

const SecretsList = ({ data }) => {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    if (!globalState.secretDes) return;
    const sshDes = globalState.secretDes.sshDescription;
    const oauthDes = globalState.secretDes.oauthDescription;
    const passDes = globalState.secretDes.passwordDescription;
    const ssh = globalState.secretDes.SSH;
    const oauth = globalState.secretDes.OAuth;
    const pass = globalState.secretDes.Password;

    const allSec = [...ssh, ...oauth, ...pass];
    const allDes = [...sshDes, ...oauthDes, ...passDes];

    globalDispatch({ type: 'ALL_DESCRIPTIONS', payload: allDes });
    globalDispatch({ type: 'ALL_SECRETS', payload: allSec });

    setDescriptions(allDes);
  }, [globalState.secretDes]);

  return <LazyList data={descriptions} type="secrets" />;
};

export default SecretsList;
