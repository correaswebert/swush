import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';

export default function SkeletonList() {
  return (
    <List>
      {[...Array(7).map((item, index) => <Skeleton variant="text" animation="wave" />)]}
    </List>
  );
}
