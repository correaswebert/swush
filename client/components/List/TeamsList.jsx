import { useEffect, useContext, useState } from 'react';
import LazyList from './Lazy';
import Context from 'store/context';

const TeamsList = () => {
  const { globalState } = useContext(Context);
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    if (!globalState.teams) return;
    console.log('teamlist', globalState.teams);
    setTeamNames([]);
    globalState.teams.forEach((team) => {
      setTeamNames([...teamNames, team._id.name]);
    });
  }, []);

  return <LazyList data={teamNames} />;
  // return <LazyList data="team" />;
};

export default TeamsList;
