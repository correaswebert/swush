import { useContext } from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Context from 'store/context';

import TeamsList from 'components/List/TeamsList';
import SecretsList from 'components/List/SecretsList';
import DataList from 'components/List/DataList';
import AppBar from 'components/Appbar';
import SpeedDial from 'components/SpeedDial';

import AddSSHModal from 'components/Modal/AddSSH';
import AddOAuthModal from 'components/Modal/AddOAuth';
import AddPasswordModal from 'components/Modal/AddPassword';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  listContainer: {
    maxHeight: '100vh',
    overflow: 'auto',
  },
}));

export default function Dashboard() {
  const { globalState, globalDispatch } = useContext(Context);
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <main className={classes.root}>
        <Grid container>
          <Grid item xs className={classes.listContainer}>
            <TeamsList />
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs className={classes.listContainer}>
            <SecretsList />
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <DataList />
            </Paper>
            <br></br>
            <AddSSHModal />
            <br></br>
            <AddOAuthModal />
            <br></br>
            <AddPasswordModal />
          </Grid>
        </Grid>
      </main>
      <SpeedDial />
    </>
  );
}
