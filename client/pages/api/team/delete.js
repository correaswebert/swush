import { connectToDatabase } from 'utils/connectDb';
import TeamDetails from 'models/TeamDetails';
import auth from 'utils/auth';

export default async (req, res) => {
  try{
    await connectToDatabase();
    const { name, jwt } = req.body;

    var isAdmin = false;

    /* authenticate the user */
    const user = await auth(jwt);

    if (!user) {
      return res.status(401).send({ Error: 'Please authenticate' });
    }

    const team = await TeamDetails.findOne({ name });

    /* if team does not exist */
    if(!team){
      res.status(200).send({Error: 'Team does not exist'});
      return;
    }

    /* check if the user is an admin */
    team.admins.forEach(admin => {
      if(admin.admin.equals(user._id)){
        isAdmin = true;
      }
    });

    if(!isAdmin){
      return res.status(200).send({Error: 'Only admins can delete a team!'});
    }

    /* delete the team */
    await team.remove();

    return res.status(200).send({Msg: 'Team deleted successfully!'});
  }catch(error){
    return res.status(500).send({Error: 'Internal server error!'});
  }
}