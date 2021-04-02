import { connectToDatabase } from 'utils/connectDb';
import UserAuth from 'models/users';
import TeamDetails from 'models/teams';
import getAuthenticatedUser from 'utils/auth';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { jwt, name, email } = req.body;

    const admin = await getAuthenticatedUser(jwt);
    const team = await TeamDetails.findOne({ name }).exec();

    if (!team) {
      return res.status(400).json({ Error: 'Team does not exist' });
    }

    const adminDoc = await team.admins.id(admin._id);

    if (!isAdmin) {
      return res.status(400).json({ Error: 'Only admins can add members!' });
    }

    await team.addMember(user._id);
    return res.status(200).json({ Info: 'Added new member successfully!' });
  } catch (error) {
    return res.status(500).json({ Error: 'Unable to add member' });
  }
};
