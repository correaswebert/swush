import { useEffect, useContext, useState } from 'react';
import LazyList from './Lazy';
import Context from 'store/context';

const TeamsList = () => {
  const { globalState } = useContext(Context);
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    if (!globalState.teams) return;
    const teamNamesArr = [];
    globalState.teams.forEach((team) => {
      setTeamNames(teamNamesArr.push(team._id.name));
    });
    setTeamNames(teamNamesArr);
  }, []);

  return <LazyList data={teamNames} />;
};

export default TeamsList;
