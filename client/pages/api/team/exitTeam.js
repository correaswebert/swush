import { connectToDatabase } from 'utils/connectDb';
import User from 'models/users';
import Team from 'models/teams';
import getAuthenticatedUser from 'utils/auth';

export default async (req, res) => {
  try {
    await connectToDatabase();
    const { jwt, name } = req.body;

    const curUser = await getAuthenticatedUser(jwt);
    const team = await Team.findOne({ name }).exec();

    /* if team does not exist */
    if (!team) {
      res.status(200).json({ Info: 'Team does not exist' });
      return;
    }

    /* remove user's id from the member's array */
    team.members = team.members.filter((member) => {
      if (member._id && !member._id.equals(curUser._id)) {
        return member;
      }
    });
    await team.save();

    /* remove team from user's team array */
    await curUser.removeTeam(team._id);

    return res.status(200).json({ Info: 'You left the team!' });
  } catch (error) {
    return res.status(500).json({ Error: 'Unable to exit' });
  }
};
