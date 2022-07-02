import withSession from 'utils/withSession';
import { connectToDatabase } from 'utils/connectDb';
import User from 'models/users';
import { generateJwt } from 'utils/generateJwt';

async function handleLogin(req, res) {
  await connectToDatabase();

  const { username, password } = req.body;

  const user = await User.findOne({ email: username }, 'password tokens name').exec();
  if (!user) {
    return res.status(401).json({ Error: 'User not found!' });
  }
  if (password !== user.password) {
    return res.status(401).json({ Error: 'Incorrect password!' });
  }

  const jwt = generateJwt(username);
  const name = user.name;

  req.session.set('user', {
    jwt: jwt,
    admin: true,
  });
  await req.session.save();
  res.send('Logged in');
}

export default withSession(handleLogin);
