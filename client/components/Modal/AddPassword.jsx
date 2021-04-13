import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from 'styles/Modal.module.css'
import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddSSHModal() {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // const router = useRouter();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function validateForm() {
    return teamName.length > 0 && password.length > 0;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const jwt = localStorage.getItem('jwt');

      const res = await axios.post(
        '/api/encryption/encrypt',
        { jwt, teamName, password, description }
      );

      alert(res.data);
      handleClose();
    } catch (error) {
      if (error?.response?.status === 500) {
        setError(error.response.data.Error);
      } else {
        setError('Some error occured!');
      }
    }
  }
  return (
    <div>
      <button onClick={handleOpen}>
        Add Password
      </button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="modal-title">Add Password</h2>
            <form id="modal-description" onSubmit={handleSubmit}>
              <label>Team Name</label>
              <br></br>
              <input 
                type='text'
                name='teamName'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <br></br>
              <label>Password</label>
              <br></br>
              <input type='text'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <label>Description</label>
              <br></br>
              <input type='text'
                type='text'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type='submit' disabled={!validateForm()}>Add</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}