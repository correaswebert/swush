import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { jwt } = req.body;

    /* authenticate the user */
    const user = await getAuthenticatedUser(jwt);

    /* get the teams of the user */
    const teams = await user.populate('teams._id').execPopulate();

    res.status(200).json(teams.teams);
  } catch (error) {
    res.status(500).json({ Error: 'Internal server error!' });
  }
};
