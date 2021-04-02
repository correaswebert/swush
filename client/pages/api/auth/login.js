import { connectToDatabase } from 'utils/connectDb';
import User from 'models/users';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }, 'password tokens').exec();
    if (!user) {
      return res.status(400).json({ Error: 'User not found!' });
    }

    if (password !== user.password) {
      return res.status(400).json({ Error: 'Unable to login' });
    }

    /* generate new token for the user */
    const newJwt = await user.generateAuthToken();

    res.status(200).send({ Info: 'Logged in successfully!', jwt: newJwt });
  } catch (error) {
    res.status(500).send({ Error: 'Internal server error.' });
    console.error(error);
  }
};
