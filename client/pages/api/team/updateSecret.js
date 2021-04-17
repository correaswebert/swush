import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import Team from 'models/teams';
import Vault from 'models/vaults';
import encryptSecret from 'utils/encrypt';
import teams from 'models/teams';

export default async (req, res) => {
  try {
    await connectToDatabase();
    const { jwt, teamName, secretId, value } = req.body;

    const user = await getAuthenticatedUser(jwt);

    const team = await Team.findOne({ name: teamName }).exec();
    var ssh;
    var oauth;
    var password;

    if (!team) {
      return res.status(200).json({ Error: 'Team does not exist' });
    }

    // check if the user is a member of the team
    const isMember = await team.members.id(user._id);
    if (!isMember) return res.json('Not a team member');

    /* get details of all the team members */
    const teamMembers = await team.populate('members._id').execPopulate();

    const publicKeys = [];

    /* get the public keys of all the team members */
    teamMembers.members.forEach((member) => {
      publicKeys.push(member._id.publicKey);
    });

    const vault = await Vault.findById(team.vaults[0]._id).exec();
    console.log(vault);

    vault.ssh.forEach((key) => {
      if (key._id.equals(secretId)) {
        ssh = key;
      }
    });

    if (!ssh) {
      vault.oauth.forEach((key) => {
        if (key._id.equals(secretId)) {
          oauth = key;
        }
      });
    }

    if (!ssh && !oauth) {
      vault.password.forEach((key) => {
        if (key._id.equals(secretId)) {
          password = key;
        }
      });
    }

    if (ssh) {
      ssh = value;
    } else if (oauth) {
      oauth = value;
    } else if (password) {
      password = value;
    }

    /* encrypt the secret */
    const encryptedSecret = await encryptSecret(publicKeys, ssh, oauth, password);

    if (ssh) {
      await Vault.findOneAndUpdate(
        { _id: team.vaults[0]._id, 'ssh._id': secretId },
        {
          $set: {
            'ssh.$.secret': encryptedSecret,
          },
        }
      );
    } else if (oauth) {
      await Vault.findOneAndUpdate(
        { _id: team.vaults[0]._id, 'oauth._id': secretId },
        {
          $set: {
            'oauth.$.secret': encryptedSecret,
          },
        }
      );
    } else if (password) {
      await Vault.findOneAndUpdate(
        { _id: team.vaults[0]._id, 'password._id': secretId },
        {
          $set: {
            'password.$.secret': encryptedSecret,
          },
        }
      );
    }

    res.status(200).json('Done');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
};
