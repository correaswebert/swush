import { connectToDatabase } from "../../../utils/connectDb";
import Team from "../../../models/teams";
import auth from "../../../utils/auth";

export default async (req, res) => {
  try{
    await connectToDatabase();

    const { jwt } = req.body;

    /* authenticate the user */
    const user = await auth(jwt);

    await user.populate('teamOwner').execPopulate();

    res.status(201).send(user.teamOwner);
  }catch(error){
    res.status(500).send({ Error: 'Internal server error!' });
 }
};