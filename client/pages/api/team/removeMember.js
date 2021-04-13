import { connectToDatabase } from 'utils/connectDb';
import User from 'models/users';
import Team from 'models/teams';
import Vault from 'models/vaults';
import getAuthenticatedUser from 'utils/auth';
const openpgp = require('openpgp');

export default async (req, res) => {
  try {
    await connectToDatabase();
    const { jwt, name, email } = req.body;

    const curUser = await getAuthenticatedUser(jwt);
    const user = await User.findOne({ email }).exec();
    const team = await Team.findOne({ name }).exec();

    /* if user does not exist */
    if (!user) {
      res.status(200).json({ Error: 'User does not exist' });
      return;
    }

    /* if team does not exist */
    if (!team) {
      res.status(200).json({ Error: 'Team does not exist' });
      return;
    }

    var isAdmin = team.admins.id(curUser._id);

    if (!isAdmin) {
      return res.status(200).json({ Error: 'Only admins can remove members!' });
    }

    /* remove user's id from the member's array */
    await team.removeMember(user._id);

    /* get details of all the team members */
    const teamMembers = await team.populate('members._id').execPopulate();
    
    const publicKeys = [];

    /* get the public keys of all the team members */
    teamMembers.members.forEach(member => {
      publicKeys.push(member._id.publicKey);
    });
    
    /* get the vault data */
    const vault = await Vault.findById(team.vaults[0]._id).exec();
    
    /* admin private key */
    const enPrivateKey = curUser.privateKey;

    /* read the encrypted pgp message */
    const privateKey = await openpgp.readMessage({ armoredMessage: enPrivateKey });

    /* decrypt the stored private key */
    const decrypted = await openpgp.decrypt({
      message: privateKey,
      passwords: curUser.password
    });

    /* re-encrypt all the secrets */
    await vault.reEncrypt(publicKeys, decrypted.data);

    /* remove the team from removed member's team array */
    await user.removeTeam(team._id);
    
    await user.notify(`You were removed from the team ${name}`);

    return res.status(200).json({ Msg: 'Removed member successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: 'Unable to remove member' });
  }
};
