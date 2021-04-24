import { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LazyList from './Lazy';
import Context from 'store/context';
import { Typography, Paper, IconButton, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateTeamDialog from 'components/Dialoag/CreateTeam';
import useFetch from 'hooks/useFetch';
import SkeletonList from 'components/List/SkeletonList';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  listHeading: {
    display: 'flex',
    borderRadius: 0,
    padding: theme.spacing(1, 1.75, 1, 3.25),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  listHeadingText: {
    textTransform: 'uppercase',
    color: theme.palette.text.main,
  },
  addIcon: {
    color: theme.palette.text.accent,
  },
}));

const TeamsList = () => {
  const { globalState, globalDispatch } = useContext(Context);
  const classes = useStyles();
  const [teamNames, setTeamNames] = useState([]);
  const router = useRouter();

  const { loading, data, error } = useFetch('/api/team/view');

  useEffect(() => {
    if (!globalState.isLoggedIn) router.push('/auth/login');
  }, []);

  useEffect(() => {
    globalDispatch({ type: 'GOT_TEAM', payload: data });
  }, [data]);

  useEffect(() => {
    if (!globalState.teams) return;
    const teamNamesArr = [];
    globalState.teams.forEach((team) => {
      teamNamesArr.push(team._id.name);
    });
    setTeamNames(teamNamesArr);
  }, [loading, globalState.teams]);

  if (error) return <div>failed to load</div>;

  function handleTeamAdd() {
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: 'CREATE_TEAM' });
  }

  return (
    <>
      <Paper className={classes.listHeading}>
        <Typography variant="h6" component="span" className={classes.listHeadingText}>
          Teams
        </Typography>
        <IconButton onClick={handleTeamAdd} className={classes.addIcon}>
          <AddIcon />
        </IconButton>
      </Paper>

      <Divider />

      {loading ? <SkeletonList /> : <LazyList data={teamNames} type="teams" />}

      <CreateTeamDialog />
    </>
  );
};

export default TeamsList;
