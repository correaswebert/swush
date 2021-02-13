import { connectToDatabase } from "../../../utils/connectDb";
import TeamDetails from "../../../models/TeamDetails";
import auth from "../../../utils/auth";

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { name, jwt } = req.body;

    /* authenticate the user */
    const user = await auth(jwt);

    const team = new TeamDetails({
      name,
      owner: user._id,
    });

    await team.save();

    res.status(201).send({ Msg: "Created a new team!" });
  } catch (error) {
    res.status(400).send({ Error: "Unable to create team" });
  }
};
