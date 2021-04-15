import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Context from 'store/context';
import useFetch from 'hooks/useFetch';

import LazyList from 'components/List/Lazy';
import TeamsList from 'components/List/TeamsList';
import AppBar from 'components/Appbar';

import AddMemberModal from 'components/Modal/AddMember';
import RemoveMemberModal from 'components/Modal/RemoveMember';
import AddSSHModal from 'components/Modal/AddSSH';
import AddOAuthModal from 'components/Modal/AddOAuth';
import AddPasswordModal from 'components/Modal/AddPassword';
import CreateTeamModal from 'components/Modal/CreateTeam';
import { Divider, Drawer } from '@material-ui/core';

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

  const { loading, data, error } = useFetch('/api/team/view');

  useEffect(() => {
    globalDispatch({ type: 'GOT_TEAM', payload: data });
  }, [data]);

  useEffect(() => {
    if (!globalState.isLoggedIn) router.push('/auth/login');
  }, []);

  if (error) return <div>failed to load</div>;
  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  // const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <AppBar />
      <main className={classes.root}>
        <Grid container>
          <Grid item xs className={classes.listContainer}>
            <TeamsList />
          </Grid>

          <Divider orientation="vertical" light={false} flexItem />

          <Grid item xs className={classes.listContainer}>
            <LazyList data={['secret']} />
          </Grid>

          <Divider orientation="vertical" light={false} flexItem />

          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
            <br></br>
            <AddMemberModal />
            <br></br>
            <RemoveMemberModal />
            <br></br>
            <AddSSHModal />
            <br></br>
            <AddOAuthModal />
            <br></br>
            <AddPasswordModal />
            <br></br>
            <CreateTeamModal />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
