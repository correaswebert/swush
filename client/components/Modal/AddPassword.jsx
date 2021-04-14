import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  paper: {
    backgroundColor: '#464b5e',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    border: '1px solid #eeeeee',
    padding: '12px',
    outline: 'none',
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '2px',
    marginTop: '4px',
    color: 'white',
  },
  h2: {
    textAlign: 'center',
  },
  button: {
    background: '#8357c5',
    border: 'none',
    color: 'white',
    fontWeight: '500',
    alignItems: 'center',
    padding: '10px',
  },
}));

export default function AddPasswordModal() {
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Password
      </Button>
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
            <h2 id="modal-title" className={classes.h2}>Add Password</h2>
            <form id="modal-description" onSubmit={handleSubmit}>
              <label className={classes.label}>Team Name</label>
              <br></br>
              <input 
                className={classes.input}
                type='text'
                name='teamName'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <br></br>
              <label className={classes.label}>Password</label>
              <br></br>
              <input 
                className={classes.input}
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <label className={classes.label}>Description</label>
              <br></br>
              <input
                className={classes.input}
                type='text'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
              <button className={classes.button} type='submit' disabled={!validateForm()}>Add</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}