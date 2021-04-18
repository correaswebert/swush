import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import AddMemberDialog from 'components/Dialoag/AddMember';
import RemoveMemberDialog from 'components/Dialoag/RemoveMember';
import GlobalContext from 'store/context';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    '&.MuiSpeedDial-directionUp': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

export default function SpeedDials() {
  const classes = useStyles();
  const { globalDispatch } = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);

  const actions = [
    {
      icon: <PersonAddIcon />,
      name: 'Add Member',
      type: 'TOGGLE_DIALOG',
      payload: 'ADD_MEMBER',
    },
    {
      icon: <PersonAddDisabledIcon />,
      name: 'Remove Member',
      type: 'TOGGLE_DIALOG',
      payload: 'REMOVE_MEMBER',
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAction = (action) => () => {
    globalDispatch({ type: action.type, payload: action.payload });
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SettingsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleAction(action)}
          />
        ))}
      </SpeedDial>

      <AddMemberDialog />
      <RemoveMemberDialog />
    </>
  );
}
