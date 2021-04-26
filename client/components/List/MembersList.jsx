import { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LazyList from './Lazy';
import Context from 'store/context';
import { Typography, Paper, IconButton, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateTeamDialog from 'components/Dialoag/CreateTeam';
import useFetch from 'hooks/useFetch';
import SkeletonList from 'components/List/SkeletonList';
import useSwr from "swr"

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

const fetcher = url => fetch(url).then(r => r.json())

const MembersList = () => {
  const { globalState, globalDispatch } = useContext(Context);
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [teamName, setTeamName] = useState('')

  // const { loading, data, error } = useFetch(`/api/team//members`);
  const { data, error } = useSwr(() => '/api/team/' + teamName + '/members', fetcher);

  useEffect(() => {
    if (!globalState.teams) return
    setTeamName(globalState.teams[globalState.teamIndex]._id.name)
  }, [globalState.teamIndex])

  useEffect(() => {
    console.log(data);
    globalDispatch({ type: 'GOT_MEMBER', payload: data?.members });
  }, [data]);

  useEffect(() => {
    if (!globalState.teams) return;
    const updatedMembersArr = [];
    globalState.members.forEach((member) => {
      updatedMembersArr.push(member._id.name);
    });
    setMembers(updatedMembersArr);
  }, [data, globalState.members]);

  if (error) return <div>failed to load</div>;

  function handleMemberAdd() {
    globalDispatch({ type: 'TOGGLE_DIALOG', payload: 'CREATE_TEAM' });
  }

  return (
    <>
      <Paper className={classes.listHeading}>
        <Typography variant="h6" component="span" className={classes.listHeadingText}>
          Members
        </Typography>
        <IconButton onClick={handleMemberAdd} className={classes.addIcon}>
          <AddIcon />
        </IconButton>
      </Paper>

      <Divider />

      {!data ? <SkeletonList /> : <LazyList data={members} type="members" />}

      <CreateTeamDialog />
    </>
  );
};

export default MembersList;
