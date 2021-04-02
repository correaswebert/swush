import { connectToDatabase } from 'utils/connectDb';
import TeamDetails from 'models/teams';
import getAuthenticatedUser from 'utils/auth';

export default async function (req, res) {
  try {
    await connectToDatabase();

    const { jwt, team: teamName, cipherText } = req.body;

    const user = await getAuthenticatedUser(jwt);

    // check if user part of team

    const members = await TeamDetails.findOne({ name: teamName }, 'members').exec();

    // members.filter((member) => member.memberId === user._id);
    console.log(members);

    // if (!isMember) return res.send('Not a team member');

    // team.secrets.push({ name: cipherText });
    // await team.save();

    return res.send('Done!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
}
