import LazyList from './Lazy';
import React from 'react';
import { useEffect, useContext, useState } from 'react';
import Context from 'store/context';

const SecretsList = ({ data }) => {
  const { globalState } = useContext(Context);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    if (!globalState.secretDes) return;
    const sshDes = globalState.secretDes.sshDescription;
    const oauthDes = globalState.secretDes.oauthDescription;
    const passDes = globalState.secretDes.passwordDescription;
    const allDes = [...sshDes, ...oauthDes, ...passDes];
    setDescriptions(allDes);
  }, [globalState.secretDes]);

  return <LazyList data={descriptions} type="secrets" />;
};

export default SecretsList;
