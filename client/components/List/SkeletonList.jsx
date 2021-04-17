import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';

export default function SkeletonList() {
  return [...Array(7)].map((_, idx) => (
    <Skeleton
      key={idx}
      variant="rect"
      height={50}
      animation="wave"
      style={{ marginBottom: '1px' }}
    />
  ));
}
