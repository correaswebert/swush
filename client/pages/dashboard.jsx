import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';

import dashboardData from 'mocks/dashboard.json';
import LazyList from 'components/List/Lazy';
import TeamsList from 'components/List/TeamsList';
import styles from 'styles/Dashboard.module.css';
import Context from 'store/context';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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

const fetcher = (url, jwt) => axios.post(url, { jwt }).then((res) => res.data);

export default function Dashboard() {
  // const { globalState } = useContext(Context);
  const router = useRouter();

  // useEffect(() => {
  //   if (!globalState.isLoggedIn) router.push('/auth/login');
  // }, []);

  // const [jwt, setJwt] = useState('');
  // const { data, error } = useSWR('/api/team/view', jwt, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // useEffect(() => {
  //   setJwt(localStorage.getItem('jwt'));
  // }, []);

  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Container fixed>
            {/* <Paper className={classes.paper}>xs</Paper> */}
            <TeamsList />
          </Container>
        </Grid>
        <Grid item xs>
          <Container fixed>
            {/* <Paper className={classes.paper}>xs</Paper> */}
            <LazyList data="secret" />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </main>
  );
}
