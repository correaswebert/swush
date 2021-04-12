import useSwr from 'swr';
import { Skeleton } from '@material-ui/lab';
import SkeletonList from './SkeletonList';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LazyList({ data }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleClick(ev, index) {
    setSelectedIndex(index);
  }

  return (
    <div className={classes.root}>
      <List component="ul" aria-label="user teams">
        {[...data].map((item, index) => (
          <ListItem
            button
            key={index}
            selected={selectedIndex === index}
            onClick={(ev) => handleClick(ev, index)}
          >
            <ListItemText primary={data} />
          </ListItem>
        ))}

        {[...Array(30)].map((item, index) => (
          <ListItem
            button
            key={index}
            selected={selectedIndex === index}
            onClick={(ev) => handleClick(ev, index)}
          >
            <ListItemText primary={`${data} ${index}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
