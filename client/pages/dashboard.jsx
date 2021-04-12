import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Context from 'store/context';
import useFetch from 'hooks/useFetch';

import LazyList from 'components/List/Lazy';
import TeamsList from 'components/List/TeamsList';

import AddMemberModal from 'components/Modal/AddMember';
import RemoveMemberModal from 'components/Modal/RemoveMember';
import AddSSHModal from 'components/Modal/AddSSH';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
  if (loading) return <div>loading...</div>;

  return (
    <main className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Container fixed>
            <TeamsList />
          </Container>
        </Grid>

        <Grid item xs>
          <Container fixed>
            <LazyList data={['secret']} />
          </Container>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
          <AddMemberModal />
          <RemoveMemberModal />
          <AddSSHModal />
        </Grid>
      </Grid>
    </main>
  );
}
