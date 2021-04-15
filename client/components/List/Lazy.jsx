import { Skeleton } from '@material-ui/lab';
import SkeletonList from './SkeletonList';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import GlobalContext from 'store/context';
import { useContext } from 'react';

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
  list: {
    padding: 0,
  },
}));

export default function LazyList({ data: listData, type: listType }) {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);

  let initialIndex =
    listType === 'teams' ? globalState.teamIndex : globalState.secretIndex;
  initialIndex = initialIndex ?? 0;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const dataMaxIndex = listData.length - 1;

  function handleListItemClick(index) {
    setSelectedIndex(index);

    switch (listType) {
      case 'teams':
        sessionStorage.setItem('teamIndex', index);
        globalDispatch({ type: 'SELECT_TEAM', payload: selectedIndex });
        break;
      case 'secrets':
        sessionStorage.setItem('secretIndex', index);
        globalDispatch({ type: 'SELECT_SECRET', payload: selectedIndex });
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <List component="ul" aria-label={listType} className={classes.list}>
        {[...listData].map((item, index) => (
          <ListItem
            button
            divider={index < dataMaxIndex}
            key={index}
            selected={selectedIndex === index}
            onClick={(_ev) => handleListItemClick(index)}
          >
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                {listType === 'teams' ? (
                  <ClearIcon fontSize="small" />
                ) : (
                  <DeleteIcon fontSize="small" />
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
