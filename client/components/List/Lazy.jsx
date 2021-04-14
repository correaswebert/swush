import { Skeleton } from '@material-ui/lab';
import SkeletonList from './SkeletonList';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function LazyList({ data }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dataMaxIndex = data.length - 1;

  function handleClick(index) {
    setSelectedIndex(index);
  }

  return (
    <div className={classes.root}>
      <List component="ul" aria-label="user teams">
        {[...data].map((item, index) => (
          <>
            <ListItem
              button
              divider={index < dataMaxIndex}
              key={index}
              selected={selectedIndex === index}
              onClick={(_ev) => handleClick(index)}
            >
              <ListItemText primary={item} />
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );
}
