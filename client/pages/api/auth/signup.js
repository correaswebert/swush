import { connectToDatabase } from 'utils/connectDb';
import UserAuth from 'models/UserAuth';
import generateKeys from 'utils/generateKeys';

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
      password: password,
      publicKey: 'MyPublicKey',
      privateKey: 'MyPrivateKey'
    };

    const newUser = new UserAuth(userAuthInfo);
    const user = await newUser.save();

    /* generate jwt token for the user */
    await user.generateAuthToken();

    /* generate key pair for the user */
    const {privateKey, publicKey} = await generateKeys(user);

    /* store user's keys */
    await user.storeKeys(publicKey, privateKey);

    res.status(200).send({ Info: 'User successfully created!', PublicKey: user.publicKey, PrivateKey: user.privateKey });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: 'Internal server error.' });
  }
};
