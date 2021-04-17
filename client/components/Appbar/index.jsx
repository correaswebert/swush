import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import GlobalContext from 'store/context';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight: theme.spacing(2),
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  notifList: {
    maxWidth: 500,
    maxHeight: 750,
  },
}));

export default function PrimarySearchAppBar() {
  const { globalDispatch } = useContext(GlobalContext);
  const router = useRouter();
  const classes = useStyles();
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const [accAnchorEl, setAccAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifications, setNotification] = React.useState(['No notifications']);

  const isMenuOpen = Boolean(accAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNotifClick = async (event) => {
    const jwt = localStorage.getItem('jwt');
    setNotifAnchorEl(event.currentTarget);

    const res = await axios.post('/api/team/viewNotifications', { jwt });

    console.log(typeof res.data.Notifications.length);

    if (res.data.Notifications.length !== 0) {
      console.log('OK');
      setNotification(res.data.Notifications);
    } else {
      setNotification(['No notifications']);
    }
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const open = Boolean(notifAnchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleProfileMenuOpen = (event) => {
    setAccAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAccAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    globalDispatch({ type: 'LOGOUT' });
    router.push('/');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      id={menuId}
      open={isMenuOpen}
      anchorEl={accAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      keepMounted
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      id={mobileMenuId}
      open={isMobileMenuOpen}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          aria-describedby={id}
          aria-label="show 11 new notifications"
          color="inherit"
          onClick={handleNotifClick}
        >
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Swush
          </Typography>
          <div className={classes.grow} />

          <Typography className={classes.title} variant="h6" noWrap>
            Hello, User
          </Typography>

          <Divider orientation="vertical" flexItem />

          <div className={classes.sectionDesktop}>
            <IconButton
              aria-describedby={id}
              aria-label="show 11 new notifications"
              color="inherit"
              onClick={handleNotifClick}
            >
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={notifAnchorEl}
              onClose={handleNotifClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List className={classes.notifList}>
                {notifications.map((_item, index) => (
                  <ListItem key={index} divider>
                    <ListItemText primary={_item} />
                  </ListItem>
                ))}
              </List>
            </Popover>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
