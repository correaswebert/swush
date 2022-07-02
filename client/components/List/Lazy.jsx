import { useState, useEffect } from 'react';
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
import axios from 'axios';
import StatusSnackbar from 'components/SnackBar/success';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    maxHeight: `calc(100vh - ${theme.appbarHeight * 2}rem)`,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: theme.spacing(1.5),
      backgroundColor: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  list: {
    padding: theme.spacing(1.75),
    backgroundColor: theme.palette.primary.main,
  },
  listItem: {
    borderRadius: theme.spacing(1.25),
  },
  listItemText: {
    color: theme.palette.text.main,
  },
  // MuiListItemRoot: {
  //   '&$selected': {
  //     backgroundColor: theme.palette.accent.main,
  //     '&:hover': {
  //       backgroundColor: theme.palette.accent.darkContrast,
  //     },
  //   },
  // },
  // MuiListItemSelected: {
  //   backgroundColor: theme.palette.accent.main,
  // },
  MuiListItemButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  MuiListItemGutters: {
    padding: '1em',
  },
}));

export default function LazyList({ data: listData, type: listType, handler }) {
  const classes = useStyles();
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let initialIndex =
    listType === 'teams' ? globalState.teamIndex : globalState.secretIndex;
  initialIndex = initialIndex ?? 0;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const handleListItemClick = async (index) => {
    setSelectedIndex(index);

    const jwt = localStorage.getItem('jwt');

    switch (listType) {
      case 'teams':
        sessionStorage.setItem('teamIndex', index);
        globalDispatch({ type: 'SELECT_TEAM', payload: selectedIndex });
        const teamName = globalState.teams[index]._id.name;

        // const teamSecrets = await axios.post('/api/team/viewVault', { jwt, teamName });
        // const secretList = teamSecrets.data;

        // globalDispatch({ type: 'GOT_SECRET_DES', payload: secretList });
        break;

      case 'secrets':
        sessionStorage.setItem('secretIndex', index);
        globalDispatch({ type: 'SELECT_SECRET', payload: selectedIndex });

        globalDispatch({
          type: 'SELECTED_SECRET',
          payload: globalState.allSecrets[index],
        });
        globalDispatch({
          type: 'SELECTED_DES',
          payload: globalState.allDescriptions[index],
        });
        globalDispatch({
          type: 'SELECTED_SEC_ID',
          payload: globalState.secretDes.secretId[index],
        });
        globalDispatch({
          type: 'SET_FILENAME',
          payload: globalState.secretDes.filename[index],
        });
        break;

      case 'members':
        globalDispatch({ type: 'SELECT_MEMBER', payload: selectedIndex });

      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <List component="ul" aria-label={listType} className={classes.list}>
        {[...listData].map((item, index) => (
          <ListItem
            button
            key={index}
            selected={selectedIndex === index}
            onClick={(_ev) => handleListItemClick(index)}
            className={classes.listItem}
            classes={{
              // root: classes.MuiListItemRoot,
              button: classes.MuiListItemButton,
              gutters: classes.MuiListItemGutters,
              // selected: classes.MuiListItemSelected,
            }}
          >
            <ListItemText primary={item} className={classes.listItemText} />
            <ListItemSecondaryAction>
              {selectedIndex === index ? (
                <IconButton
                  onClick={() => handler()}
                  // onClick={listType === 'teams' ? handleExitTeam : handleDeleteSecret}
                  edge="end"
                  aria-label="delete"
                >
                  {listType === 'teams' ? (
                    <ClearIcon fontSize="small" />
                  ) : (
                    <DeleteIcon fontSize="small" />
                  )}
                </IconButton>
              ) : (
                ''
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <StatusSnackbar message={successMessage} statusType="success" />
      <StatusSnackbar message={errorMessage} statusType="error" />
    </div>
  );
}
