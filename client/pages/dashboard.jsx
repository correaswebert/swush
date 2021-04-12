import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
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

const useFetch = (query) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      const response = await axios.post('/api/team/view', { jwt });
      const data = await response.json();
      setData(data.hits);
      setStatus(false);
    };

    fetchData();
  }, [query]);

  return { status, data };
};

// const fetcher = (url, jwt) =>
//   axios
//     .post(url, {
//       jwt:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvcnJlYXN3ZWJlcnRAZ21haWwuY29tIiwiaWF0IjoxNjE4MTcxNzkyLCJleHAiOjE2MTg3NzY1OTJ9.2rgdMwBURX8p4UFhHj7Oe02db1L_UbzNXtXvgRCdBv8',
//     })
//     .then((res) => res.data);

export default function Dashboard() {
  const { globalState, globalDispatch } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!globalState.isLoggedIn) router.push('/auth/login');
  }, []);

  const [jwt, setJwt] = useState('');
  // const { data, error } = useSWR(['/api/team/view', jwt], fetcher);

  const [data, setData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetcher() {
      try {
        const res = await axios.post('/api/team/view', {
          jwt: globalState.jwt,
        });
        setData(res.data);
        globalDispatch({ type: 'GOT_TEAM', payload: res.data });
        console.log('dashboard');
        console.table(globalState);
        console.table(globalState.teams[0]);
      } catch (err) {
        console.error(error);
        setError(error);
      }
    }
    fetcher();
  }, []);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  useEffect(() => {
    console.log(data);
  }, [data]);

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
