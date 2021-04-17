import LazyList from './Lazy';
import { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GlobalContext from 'store/context';
import SkeletonList from 'components/List/SkeletonList';
import { Typography, Paper, IconButton, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateSecretDialog from 'components/Dialoag/CreateSecret';
import useFetch from 'hooks/useFetch';

const useStyles = makeStyles((theme) => ({
  listHeading: {
    display: 'flex',
    borderRadius: 0,
    padding: theme.spacing(1.5, 0.5, 1.5, 1.5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listHeadingText: {
    textTransform: 'uppercase',
  },
}));

const SecretsList = () => {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [descriptions, setDescriptions] = useState([]);

  const { loading, data, error } = useFetch('/api/team/viewVault');

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

  function handleTeamAdd() {
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: 'CREATE_SECRET' });
  }

  return (
    <>
      <Paper className={classes.listHeading}>
        <Typography variant="h6" component="span" className={classes.listHeadingText}>
          Secrets
        </Typography>
        <IconButton onClick={handleTeamAdd}>
          <AddIcon />
        </IconButton>
      </Paper>

      <Divider />

      {loading ? <SkeletonList /> : <LazyList data={descriptions} type="secrets" />}

      <CreateSecretDialog />
    </>
  );
};

export default SecretsList;
