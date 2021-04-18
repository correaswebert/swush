import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import GlobalContext from 'store/context';
import StatusSnackbar from 'components/SnackBar/success';
import axios from 'axios';

export default function FormDialog() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleDialogOpenState = () => {
    const nameState = globalState.nameOpenDialog ? '' : 'DELETE_TEAM';
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: nameState });
  };

  const handleDeleteTeam = async (e) => {
    try {
      e.preventDefault();
      const jwt = globalState.jwt;
      const teamName = globalState.teams[globalState.teamIndex]._id.name;
      const res = await axios.post('/api/team/delete', { name: teamName, jwt });
      setStatus({ type: 'success', msg: res.data.Info });
      //   globalDispatch({
      //     type: 'GOT_TEAM',
      //     payload: [...globalState.teams, res.data.team],
      //   });
      handleDialogOpenState();
    } catch (error) {
      if (error?.response?.status === 500) {
        setStatus({ type: 'error', msg: error.response.data.Error });
      } else {
        setStatus({ type: 'error', msg: 'Some error occured!' });
        console.error(error);
      }
    }
  };

  return (
    <>
      <Dialog
        open={globalState.nameOpenDialog === 'DELETE_TEAM'}
        onClose={handleDialogOpenState}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Delete Selected Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Type the team name to delete"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogOpenState} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTeam} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* {status ? <StatusSnackbar message={successMessage} statusType="success" /> : ''} */}
      <StatusSnackbar message={status.msg} statusType={status.type} />
    </>
  );
}
