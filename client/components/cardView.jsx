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
import theme from 'theme/dark';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#d2d2d2',
    height: '100vh',
    padding: theme.spacing(5),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    // fontSize: 14,
    fontWeight: 'normal',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardView() {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const bull = <span className={classes.bullet}>•</span>;

  function handleUpdateSecret() {
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: 'UPDATE_SECRET' });
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Description
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          className={classes.title}
          color="primary"
          gutterBottom
        >
          {globalState.selectedDes /*? 'Your Secret!' : globalState.selectedDes*/}
        </Typography>
        <Typography variant="h6" component="h5" color="textSecondary" gutterBottom>
          Secret Data
        </Typography>
        <Typography variant="h4" component="h5">
          {
            globalState.selectedSecret /*? 'View your secret here!': globalState.selectedSecret*/
          }
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleUpdateSecret}
          variant="outlined"
          size="large"
          color="primary"
          style={{ position: 'fixed', bottom: '2em' }}
        >
          Update
        </Button>
      </CardActions>
      <UpdateSecretDialog />
    </Card>
  );
}
