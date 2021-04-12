import LazyList from "./Lazy"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SecretsList = ({data}) => {
  const classes = useStyles();

  return (
      <LazyList data>
      </LazyList>
  )
}

export default SecretsList
