import { useContext } from 'react';
import LazyList from './Lazy';
import Context from 'store/context';

const TeamsList = () => {
  const { globalState } = useContext(Context);

  const teamNames = [];
  globalState.teams.forEach((team) => {
    teamNames.push(team._id.name);
  });

  return <LazyList data={globalState.teams} />;
};

export default TeamsList;
