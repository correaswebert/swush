import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import Team from 'models/teams';
import Vault from 'models/vaults';
const openpgp = require('openpgp');

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { jwt, teamName } = req.body;
    const user = await getAuthenticatedUser(jwt);

    const team = await Team.findOne({ name: teamName }).exec();

    if (!team) {
      return res.status(200).json({ Info: 'Team does not exist' });
    }

    /* populate the vaults property */
    const vault = await Vault.findById(team.vaults[0]._id).exec();

    /* user private key */
    const enPrivateKey = user.privateKey;

    /* read the encrypted pgp message */
    const privateKey = await openpgp.readMessage({ armoredMessage: enPrivateKey });

    /* decrypt the stored private key */
    const decrypted = await openpgp.decrypt({
      message: privateKey,
      passwords: user.password,
    });

    // console.log('Before vault decrypted');

    /* decrypt the secrets */
    const secrets = await vault.decryption(decrypted.data);

    // console.log('After vault decrypted');

    res.status(200).json(secrets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: 'Internal server error!' });
  }
};
