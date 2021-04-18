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
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDialogOpenState = () => {
    const nameState = globalState.nameOpenDialog ? '' : 'REMOVE_MEMBER';
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: nameState });
  };

  async function handleRemoveMember(e) {
    try {
      e.preventDefault();
      setSuccessMessage('');
      setErrorMessage('');

      const jwt = localStorage.getItem('jwt');
      const teamName = globalState.teams[globalState.teamIndex]._id.name;
      const res = await axios.post('/api/team/removeMember', {
        jwt,
        name: teamName,
        email,
      });
      setSuccessMessage('Successfully removed member!');
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
        open={globalState.nameOpenDialog === 'REMOVE_MEMBER'}
        onClose={handleDialogOpenState}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Remove member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter member's email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogOpenState} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveMember} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <StatusSnackbar message={successMessage} statusType="success" />
      <StatusSnackbar message={errorMessage} statusType="error" />
    </>
  );
}
