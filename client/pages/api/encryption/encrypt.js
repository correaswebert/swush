import { connectToDatabase } from 'utils/connectDb';
import UserAuth from 'models/UserAuth';
import TeamDetails from 'models/TeamDetails';
import getAuthenticatedUser from 'utils/auth';

export default async function (req, res) {
  try {
    await connectToDatabase();

    const { jwt, team: teamName, cipherText } = req.body;

    const user = await getAuthenticatedUser(jwt);

    // check if user part of team

    const team = await TeamDetails.findOne({ name: teamName });
    var isMember = false;

    team.members.forEach((member) => {
      console.log(member);
      if (member.memberId.equals(user._id)) isMember = true;
    });

    if (!isMember) return res.send('Not a team member');

    team.secrets.push({ name: cipherText });
    await team.save();

    return res.send('Done!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
}
