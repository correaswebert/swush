import { connectToDatabase } from "../../../utils/connectDb";
import UserAuth from "../../../models/UserAuth";

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { email, password } = req.body;
    const user = await UserAuth.findOne({ email: email });

    if (!user) {
      res.status(400).send({ Error: "User not found!" });
      return;
    }
    if (password !== user.password) {
      res.status(400).send({ Error: "Unable to login" });
      return;
    }

    /* generate token for the user */
    await user.generateAuthToken();

    res.status(200).send({ Info: "Logged in successfully!" });
  } catch (error) {
    res.status(500).send({ Error: "Internal server error." });
  }
};
