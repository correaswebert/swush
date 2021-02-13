import { connectToDatabase } from "../../../utils/connectDb";
import UserAuth from "../../../models/UserAuth";

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ Error: "Enter all fields!" });
    }

    const doesUserExist = await UserAuth.findOne({ email: email });

    if (doesUserExist) {
      return res.status(400).send({ Error: "User already exists!" });
    }

    const newUser = new UserAuth({
      name: name,
      email: email,
      password: password,
    });

    await newUser.save();

    // TODO: using the above newUser instance, create a UserDetails instance
    //       by sharing the objectId.

    /* generate token for the newUser */
    await newUser.generateAuthToken();

    res.status(200).send({ Info: "User successfully created!" });
  } catch (error) {
    res.status(500).send({ Error: "Internal server error." });
  }
};
