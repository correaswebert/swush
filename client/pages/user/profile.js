import { useContext } from 'react';
import { connectToDatabase } from 'utils/connectDb';
import { makeStyles } from '@material-ui/core/styles';
import withSession from 'utils/withSession';
import getAuthenticatedUser from 'utils/auth';
import GlobalContext from 'store/context';

import Divider from '@material-ui/core/Divider';
import AppBar from 'components/Appbar';
import UpdateProfileDialog from 'components/Dialoag/UpdateProfile';
import ProfileCard from 'components/CardView/ProfileCard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: `calc(100vh - ${theme.appbarHeight}rem)`,
    minWidth: 275,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.down(500)]: {
      padding: theme.spacing(1),
    },
  },
  root: {
    height: '100%',
    maxWidth: '90vw',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
  },
  description: {
    color: theme.palette.text.accent,
  },
  secretDescription: {
    marginBottom: theme.spacing(2),
  },
  data: {
    color: theme.palette.text.main,
    fontWeight: 'normal',
    fontSize: '15px',
  },
  buttonContainer: {
    position: 'fixed',
    bottom: theme.spacing(5),
    [theme.breakpoints.down(500)]: {
      bottom: theme.spacing(1),
    },
  },
  updateButton: {
    fontSize: '1.15rem',
    color: theme.palette.text.main,
    borderColor: theme.palette.text.accent,
    marginTop: '5px',
  },
}));

export default function UserProfile({ publicKey, email, teams }) {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);

  return (
    <>
      <AppBar />
      <Divider />
      <ProfileCard
        name={globalState.username}
        publicKey={publicKey}
        email={email}
        numTeams={teams}
        showActions
      />
      <UpdateProfileDialog />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ query, req, res }) {
  const sessionUser = req.session.get('user');

  if (!sessionUser) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  await connectToDatabase();

  const user = await getAuthenticatedUser(sessionUser.jwt);

  return {
    props: {
      publicKey: user.publicKey,
      email: user.email,
      teams: user.teams.length,
    },
  };
});
