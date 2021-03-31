import { connectToDatabase } from 'utils/connectDb';
import UserAuth from 'models/UserAuth';
import TeamDetails from 'models/TeamDetails';
import auth from 'utils/auth';

export default async (req, res) => {
  try{
    await connectToDatabase();

    const { jwt, name, email } = req.body;

    const curUser = await auth(jwt);
    const user = await UserAuth.findOne({ email });
    const team = await TeamDetails.findOne({ name });

    var isAdmin = false;

    /* if user does not exist */
    if(!user){
      res.status(200).send({Error: 'User does not exist'});
      return;
    }

    /* if team does not exist */
    if(!team){
      res.status(200).send({Error: 'Team does not exist'});
      return;
    }
    
    /* check if the user is an admin */
    team.admins.forEach(admin => {
      if(admin.adminId.equals(curUser._id)){
        isAdmin = true;
      }
    });

    if(!isAdmin){
      return res.status(200).send({Error: 'Only admins can add members!'});
    }

    const member = user._id;
    team.members = team.members.concat({ member });
    await team.save();
    return res.status(200).send({Msg: 'Added new member successfully!'});
  
  }catch(error){
    return res.status(500).send({Error: 'Unable to add member'});
  }
}