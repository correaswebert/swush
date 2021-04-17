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

export default function FormDialog() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDialogOpenState = () => {
    const nameState = globalState.nameOpenDialog ? '' : 'ADD_MEMBER';
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: nameState });
  };

  async function handleAddMember(e) {
    try {
      e.preventDefault();
      setSuccessMessage('');
      setErrorMessage('');

      const jwt = localStorage.getItem('jwt');
      const teamName = globalState.teams[globalState.teamIndex]._id.name;
      throw Error();
      //   const res = await axios.post('/api/team/addMember', { jwt, name: teamName, email });
      setSuccessMessage('Successfully added member!');
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
        open={globalState.nameOpenDialog === 'ADD_MEMBER'}
        onClose={handleDialogOpenState}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add new member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter member's email"
            type="email"
            fullWidth
          />

          <Checkbox
            checked={isAdmin}
            onChange={() => {
              setIsAdmin(!isAdmin);
            }}
            inputProps={{ 'aria-label': 'Make member an admin' }}
          />
          <Typography variant="body1" component="span">
            Make admin?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogOpenState} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMember} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <StatusSnackbar message={successMessage} statusType="success" />
      <StatusSnackbar message={errorMessage} statusType="error" />
    </>
  );
}
