import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import withSession from 'utils/withSession';
import User from 'models/users';

async function handleUser(req, res) {
  try {
    await connectToDatabase();

    const { jwt } = req.session.get('user');
    var { name, password } = req.body;
    const user = await getAuthenticatedUser(jwt);

    if (typeof name === undefined || name === '') {
      name = user.name;
    }
    if (typeof password === undefined || password === '') {
      password = user.password;
    }
    await User.findByIdAndUpdate(user._id, { name, password });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: 'Internal server error!' });
  }
}

export default withSession(handleUser);
