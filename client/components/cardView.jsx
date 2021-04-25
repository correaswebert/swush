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
  updateButton: {
    position: 'fixed',
    bottom: theme.spacing(5),
    fontSize: '1.15rem',
    color: '#e6e6e6',
    borderColor: '#565656',
  },
  download: {
    bottom: theme.spacing(0),
    fontSize: '1.15rem',
    color: '#e6e6e6',
    borderColor: '#565656',
  },
}));

export default function CardView() {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);

  function handleUpdateSecret() {
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: 'UPDATE_SECRET' });
  }

  function handleDownload() {
    const a = document.createElement('a');
    var contentType;
    const filename = globalState.selectedFileName;
    if (globalState.selectedFileName.match(/\.png$/)) {
      contentType = 'image/png';
    } else if (globalState.selectedFileName.match(/\.jpg$/)) {
      contentType = 'image/jpg';
    } else if (globalState.selectedFileName.match(/\.jpeg$/)) {
      contentType = 'image/jpeg';
    } else if (globalState.selectedFileName.match(/\.txt$/)) {
      contentType = 'text/plain';
    }
    var file;

    if (contentType.startsWith('image/')) {
      const imageData = atob(globalState.selectedSecret);
      const byteNumbers = new Array(imageData.length);
      for (let i = 0; i < imageData.length; i++) {
        byteNumbers[i] = imageData.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      file = new Blob([byteArray], { type: contentType });
    } else if (contentType.startsWith('text/')) {
      file = new Blob([globalState.selectedSecret], { type: contentType });
    }

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
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
          {globalState.selectedFileName === 'ssh' ||
          globalState.selectedFileName === 'oauth' ||
          globalState.selectedFileName === 'pass'
            ? globalState.selectedSecret
            : globalState.selectedFileName}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          onClick={handleUpdateSecret}
          variant="outlined"
          size="large"
          className={classes.updateButton}
        >
          Update
        </Button>
        <Button
          onClick={handleDownload}
          className={classes.download}
          variant="outlined"
          size="large"
        >
          Download
        </Button>
      </CardActions>
      <UpdateSecretDialog />
    </Card>
  );
}
