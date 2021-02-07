import { connectToDatabase } from "../../../utils/connectDb";
import User from "../../../models/user";

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ Error: "Enter all fields!" });
      return;
    }

    const doesUserExist = await User.findOne({ email: email });

    if (doesUserExist) {
      res.status(400).send({ Error: "User already exists!" });
      return;
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
    });
    await user.save();
    res.status(200).send({ Info: "User successfully created!" });
  } catch (error) {
    res.status(500).send({ Error: "Internal server error." });
  }
};
