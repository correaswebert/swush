import { connectToDatabase } from 'utils/connectDb';
import Team from 'models/teams';
import getAuthenticatedUser from 'utils/auth';
import Vault from 'models/vaults';
import User from 'models/users';

export default async (req, res) => {
  try{
    await connectToDatabase();
    const { name, jwt } = req.body;

    /* authenticate the user */
    const user = await getAuthenticatedUser(jwt);

    if (!user) {
      return res.status(401).json({ Error: 'Please authenticate' });
    }

    const team = await Team.findOne({ name }).exec();

    /* if team does not exist */
    if(!team){
      res.status(200).json({Error: 'Team does not exist'});
      return;
    }

    /* check if the user is an admin */
    var isAdmin = await team.admins.id(user._id);

    if(!isAdmin){
      return res.status(200).json({Error: 'Only admins can delete a team!'});
    }

    const vault = await Vault.findById(team.vaults[0]._id).exec();
    
    /* delete the vault associated with the team */
    await vault.remove();

    /* remove the team from all member's team array */
    team.members.forEach(async (member) => {
      // console.log(member._id);
      const mem = await User.findById(member._id);
      await mem.removeTeam(team._id);
    });

    /* delete the team */
    await team.remove();

    return res.status(200).json({Msg: 'Team deleted successfully!'});
  }catch(error){
    return res.status(500).json({Error: 'Internal server error!'});
  }
}