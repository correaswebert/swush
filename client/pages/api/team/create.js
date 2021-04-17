import { connectToDatabase } from 'utils/connectDb';
import Team from 'models/teams';
import Vault from 'models/vaults';
import getAuthenticatedUser from 'utils/auth';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { name: teamName, jwt } = req.body;

    const user = await getAuthenticatedUser(jwt);

    const vault = new Vault({ name: 'default' });
    await vault.save();

    const team = new Team({
      name: teamName,
      admins: [{ _id: user._id }],
      members: [{ _id: user._id }],
      vaults: [{ _id: vault._id }],
    });

    await team.save();

    const getTeam = await Team.findOne({ name: teamName }).exec();
    await user.addTeam(getTeam._id);

    res.status(201).json({ msg: `Created team: ${teamName}!`, team: team });
  } catch (e) {
    if (e.name === 'MongoError' && e.code === 11000) {
      return res.status(500).json({ Error: 'Team name taken!' });
    }

    console.error(e);
    res.status(500).json({ Error: 'Internal server error!' });
  }
};
