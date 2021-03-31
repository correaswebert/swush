import { connectToDatabase } from 'utils/connectDb';
import UserAuth from 'models/users';

export default async (req, res) => {
  try {
    await connectToDatabase();

    // console.log(req.body);
    // const reqData = JSON.parse(req.body);
    // console.log(reqData);
    // const { email, password } = reqData;
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserAuth.findOne({ email: email });

    if (!user) {
      res.status(400).json({ Error: 'User not found!' });
      return;
    }
    if (password !== user.password) {
      res.status(400).json({ Error: 'Unable to login' });
      return;
    }

    /* generate token for the user */
    await user.generateAuthToken();

    res.status(200).send({ Info: 'Logged in successfully!', jwt: user.tokens[0] });
  } catch (error) {
    res.status(500).send({ Error: 'Internal server error.' });
    console.error(error);
  }
};
