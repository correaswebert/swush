import { connectToDatabase } from 'utils/connectDb';
import UserAuth from 'models/UserAuth';

export default async (req, res) => {
  try {
    await connectToDatabase();

    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ Error: 'Enter all fields!' });
    }

    // sanitize input
    name = name.toString();
    email = email.toString();
    password = password.toString();

    const currUser = await UserAuth.findOne({ email: email });
    if (currUser) {
      return res.status(409).send({ Error: 'User already exists!' });
    }

    const userAuthInfo = {
      name: name,
      email: email,
      password: password
    };

    const newUser = new UserAuth(userAuthInfo);
    const user = await newUser.save();

    await user.generateAuthToken();

    res.status(200).send({ Info: 'User successfully created!' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: 'Internal server error.' });
  }
};
