import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SkeletonList() {
  return (
    <ul>
      <Skeleton variant="text" animation="wave" />
    </ul>
  );
}
