import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import withSession from 'utils/withSession';
import Team from 'models/teams';

async function handleUser(req, res) {
  try {
    await connectToDatabase();

    const { jwt } = req.session.get('user');
    const { _id: userId } = await getAuthenticatedUser(jwt);
    let isAdmin = false;

    const { id: teamId } = req.query;
    const team = await Team.findById(teamId).exec();

    for (const key of team.admins) {
      if (key._id.toString() === userId.toString()) {
        isAdmin = true;
        break;
      }
    }
    if (!isAdmin) throw new Error();

    const { admins } = await team
      .populate('admins._id', 'email name publicKey')
      .execPopulate();
    const { members } = await team
      .populate('members._id', 'email name publicKey')
      .execPopulate();

    res.status(200).json({ admins, members });
  } catch (error) {
    res.status(500).json({ Error: 'Internal server error!' });
  }
}

export default withSession(handleUser);
