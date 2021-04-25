import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import withSession from 'utils/withSession';
import User from 'models/users';

async function handleUser(req, res) {
  try {
    await connectToDatabase();

    const { jwt } = req.session.get('user');
    const { name, password } = req.body
    const user = await getAuthenticatedUser(jwt);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ Error: 'Internal server error!' });
  }
}

export default withSession(handleUser);
