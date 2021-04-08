import { connectToDatabase } from 'utils/connectDb';
import User from 'models/users';
import { generateJwt } from 'utils/generateJwt';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }, 'password tokens').exec();
    if (!user) {
      return res.status(401).json({ Error: 'User not found!' });
    }
    if (password !== user.password) {
      return res.status(401).json({ Error: 'Incorrect password!' });
    }

    const jwt = generateJwt(email);

    res.status(200).json({ Info: 'Logged in successfully!', jwt });
  } catch (error) {
    res.status(500).json({ Error: 'Internal server error.' });
    console.error(error);
  }
};
