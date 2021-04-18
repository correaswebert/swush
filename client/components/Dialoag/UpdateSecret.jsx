import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

import GlobalContext from 'store/context';
import { Typography } from '@material-ui/core';
import StatusSnackbar from 'components/SnackBar/success';
import axios from 'axios';

export default function FormDialog() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [value, setSecret] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDialogOpenState = () => {
    const nameState = globalState.nameOpenDialog ? '' : 'UPDATE_SECRET';
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: nameState });
  };

  async function handleUpdateSecret(e) {
    try {
      e.preventDefault();
      setSuccessMessage('');
      setErrorMessage('');

      const jwt = localStorage.getItem('jwt');
      const teamName = globalState.teams[globalState.teamIndex]._id.name;
      const secretId = globalState.selectedSecretId;

      const res = await axios.post('/api/team/updateSecret', {
        jwt,
        teamName,
        secretId,
        value,
      });
      setSuccessMessage('Successfully updated secret!');
    } catch (error) {
      if (error?.response?.status === 500) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage('Some error occurred!');
      }
    } finally {
      handleDialogOpenState();
    }
  }

  return (
    <>
      <Dialog
        open={globalState.nameOpenDialog === 'UPDATE_SECRET'}
        onClose={handleDialogOpenState}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Update Secret</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter new secret"
            type="text"
            value={value}
            onChange={(e) => {
              setSecret(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogOpenState} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSecret} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <StatusSnackbar message={successMessage} statusType="success" />
      <StatusSnackbar message={errorMessage} statusType="error" />
    </>
  );
}
