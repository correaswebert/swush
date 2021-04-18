import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: '1px',
  },
}));

export default function SkeletonList() {
  const classes = useStyles();
  return [...Array(7)].map((_, idx) => (
    <Skeleton
      key={idx}
      variant="rect"
      height={50}
      animation="wave"
      className={classes.skeleton}
    />
  ));
}
