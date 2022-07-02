import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import withSession from 'utils/withSession';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GlobalContext from 'store/context';
import SecretsList from 'components/List/SecretsList';
import AppBar from 'components/Appbar';
import SpeedDial from 'components/SpeedDial';

import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    overflow: 'auto',
  },
  container: {
    flex: '1 1 auto',
    backgroundColor: theme.palette.primary.main,
    height: `calc(100vh - ${theme.appbarHeight}rem)`,
  },
}));

export default function Dashboard() {
  const { globalState } = useContext(GlobalContext);
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    router.push('/m/data');
  }, [globalState.secretIndex]);

  return (
    <>
      <AppBar />

      <Divider />

      <Grid container className={classes.container}>
        <Grid item xs className={classes.listContainer}>
          <SecretsList />
        </Grid>
      </Grid>

      <SpeedDial />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
