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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.secondary.main,
    height: 'calc(100vh - 4.05rem)',
    padding: theme.spacing(5),
    borderRadius: 0,
  },
  description: {
    color: theme.palette.text.accent,
  },
  secretDescription: {
    marginBottom: theme.spacing(7),
  },
  data: {
    color: theme.palette.text.main,
    fontWeight: 'normal',
  },
  buttonContainer: {
    position: 'fixed',
    bottom: theme.spacing(5),
  },
  updateButton: {
    fontSize: '1.15rem',
    color: '#e6e6e6',
    borderColor: '#565656',
  },
  downloadIcon: {
    color: '#e6e6e6',
  },
}));

export default function CardView() {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);

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
          gutterBottom
          classes={{ root: classes.description }}
        >
          Description
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          className={classes.data}
          gutterBottom
          classes={{ root: classes.secretDescription }}
        >
          {globalState.selectedDes}
        </Typography>

        <Typography
          variant="h6"
          component="h5"
          className={classes.title}
          gutterBottom
          classes={{ root: classes.description }}
        >
          Secret Data
        </Typography>
        <Typography variant="h4" component="h5" className={classes.data} gutterBottom>
          {globalState.selectedSecret}
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
        <IconButton>
          <CloudDownloadIcon className={classes.downloadIcon} fontSize="large" />
        </IconButton>
      </CardActions>
      <UpdateSecretDialog />
    </Card>
  );
}
