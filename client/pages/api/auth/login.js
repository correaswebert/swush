import { connectToDatabase } from "../../../utils/connectDb";
import User from "../../../models/user";

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).send({ Error: "User not found!" });
      return;
    }
    if (password !== user.password) {
      res.status(400).send({ Error: "Unable to login" });
      return;
    }

    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ Error: "Internal server error." });
  }
};
