import { connectToDatabase } from 'utils/connectDb';
import TeamDetails from 'models/teams';
import Vault from 'models/vaults';
import getAuthenticatedUser from 'utils/auth';
import encryptSecret from 'utils/encrypt';

export default async function (req, res) {
  try {
    await connectToDatabase();

    const { jwt, teamName, description, secret, secretType } = req.body;

    console.log(teamName);

    const user = await getAuthenticatedUser(jwt);

    var isMember = false;

    // check if the team exists
    const team = await TeamDetails.findOne({ name: teamName }).exec();
    if (!team) return res.json('Team does not exists');

    // check if the user is a member of the team
    isMember = await team.members.id(user._id);
    if (!isMember) return res.json('Not a team member');

    /* get details of all the team members */
    const teamMembers = await team.populate('members._id').execPopulate();

    const publicKeys = [];

    /* get the public keys of all the team members */
    teamMembers.members.forEach((member) => {
      publicKeys.push(member._id.publicKey);
    });

    /* encrypt the secret */
    const encryptedSecret = await encryptSecret(publicKeys, secret);

    if (secretType === 'ssh') {
      const vault = await Vault.findById(team.vaults[0]._id).exec();
      await vault.addSecret('ssh', description, encryptedSecret);
    } else if (secretType === 'oauth') {
      const vault = await Vault.findById(team.vaults[0]._id).exec();
      await vault.addSecret('oauth', description, encryptedSecret);
    } else if (secretType === 'password') {
      const vault = await Vault.findById(team.vaults[0]._id).exec();
      await vault.addSecret('password', description, encryptedSecret);
    }

    return res.json('Done!');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error.');
  }
}
