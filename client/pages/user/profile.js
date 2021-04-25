import withSession from 'utils/withSession';
import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useEffect, useContext, useState } from 'react';
import Context from 'store/context';
import GlobalContext from 'store/context';
import UpdateSecretDialog from 'components/Dialoag/UpdateSecret';
import AppBar from 'components/Appbar';
import UpdateProfileDialog from 'components/Dialoag/UpdateProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.secondary.main,
    height: `calc(100vh - ${theme.appbarHeight}rem)`,
    padding: theme.spacing(5),
    borderRadius: 0,
    [theme.breakpoints.down(500)]: {
      padding: theme.spacing(1),
    },
  },
  description: {
    color: theme.palette.text.accent,
  },
  secretDescription: {
    marginBottom: theme.spacing(2),
  },
  data: {
    color: theme.palette.text.main,
    fontWeight: 'normal',
    fontSize: '15px',
  },
  buttonContainer: {
    position: 'fixed',
    bottom: theme.spacing(5),
    [theme.breakpoints.down(500)]: {
      bottom: theme.spacing(1),
    },
  },
  updateButton: {
    fontSize: '1.15rem',
    color: theme.palette.text.main,
    borderColor: theme.palette.text.accent,
    marginTop: '5px',
  },
}));
export default function UserProfile({ name, publicKey, email, teams }) {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);

  function handleUpdateSecret() {
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: 'UPDATE_PROFILE' });
  }

  return (
    <>
      <AppBar />
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h6"
            component="h6"
            className={classes.title}
            gutterBottom
            classes={{ root: classes.description }}
          >
            Name
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            className={classes.data}
            gutterBottom
            classes={{ root: classes.secretDescription }}
          >
            {globalState.username}
          </Typography>

          <Typography
            variant="h6"
            component="h6"
            className={classes.title}
            gutterBottom
            classes={{ root: classes.description }}
          >
            Email
          </Typography>
          <Typography variant="h6" component="h6" className={classes.data} gutterBottom>
            {email}
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            className={classes.title}
            gutterBottom
            classes={{ root: classes.description }}
          >
            Teams you are a part of
          </Typography>
          <Typography variant="h6" component="h6" className={classes.data} gutterBottom>
            {teams}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            className={classes.title}
            gutterBottom
            classes={{ root: classes.description }}
          >
            Public Key
          </Typography>
          <Typography variant="h6" component="h3" className={classes.data} gutterBottom>
            {publicKey}
          </Typography>
        </CardContent>

        <CardActions className={classes.buttonContainer}>
          <Button
            className={classes.updateButton}
            onClick={handleUpdateSecret}
            variant="outlined"
            size="large"
          >
            Update
          </Button>
        </CardActions>
        <UpdateSecretDialog />
      </Card>
      <UpdateProfileDialog />
    </>
  );
}

// localhost:3000/6083e1a7873fb913a0c6b34e

export const getServerSideProps = withSession(async function ({ query, req, res }) {
  const sessionUser = req.session.get('user');

  if (!sessionUser) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  await connectToDatabase();

  const user = await getAuthenticatedUser(sessionUser.jwt);

  return {
    props: {
      name: user.name,
      publicKey: user.publicKey,
      email: user.email,
      teams: user.teams.length,
    },
  };
});
