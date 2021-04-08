import { connectToDatabase } from 'utils/connectDb';
import TeamDetails from 'models/teams';
import Vault from 'models/vaults';
import getAuthenticatedUser from 'utils/auth';
import encryptSecret from 'utils/encrypt';

export default async function (req, res) {
  try {
    await connectToDatabase();

    const { jwt, teamName, ssh, oauth, password, description } = req.body;

    const user = await getAuthenticatedUser(jwt);
    
    var isMember = false;

    // check if the team exists
    const team = await TeamDetails.findOne({ name: teamName }).exec();
    if(!team) return res.send('Team does not exists');

    // check if the user is a member of the team
    isMember = await team.members.id(user._id);
    if (!isMember) return res.send('Not a team member');

    /* get details of all the team members */
    const teamMembers = await team.populate('members._id').execPopulate();
    
    const publicKeys = [];

    /* get the public keys of all the team members */
    teamMembers.members.forEach(member => {
      publicKeys.push(member._id.publicKey);
    });

    console.log(publicKeys);

    /* encrypt the secret */
    const encryptedSecret = await encryptSecret(publicKeys, ssh, oauth, password);
    
    if(ssh){
      const vault = await Vault.findOne(team.vaults._id).exec();
      await vault.addSecret('ssh', description, encryptedSecret);
    }
    else if(oauth){
      const vault = await Vault.findOne(team.vaults._id).exec();
      await vault.addSecret('oauth', description, encryptedSecret);
    }
    else if(password){
      const vault = await Vault.findOne(team.vaults._id).exec();
      await vault.addSecret('password', description, encryptedSecret);
    }

    return res.send('Done!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
}
