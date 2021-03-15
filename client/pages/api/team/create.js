import { connectToDatabase } from 'utils/connectDb';
import TeamDetails from 'models/TeamDetails';
import auth from 'utils/auth';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { name, jwt } = req.body;

    /* authenticate the user */
    const user = await auth(jwt);

    if (!user) {
      return res.status(401).send({ Error: 'Please authenticate' });
    }

    const team = new TeamDetails({
      name
    });

    await team.save();

    await team.assignAdmin(user._id);

    if (user) {
      return res.status(201).send({ Msg: 'Created a new team!' });
    }
  } catch (error) {
    res.status(400).send({ Error: 'Unable to create team' });
  }
};
