import { connectToDatabase } from 'utils/connectDb';
import TeamDetails from 'models/teams';
import UserAuth from 'models/users';
import getAuthenticatedUser from 'utils/auth';

export default async (req, res) => {
  try {
    await connectToDatabase();

    const { name, jwt } = req.body;

    const user = await getAuthenticatedUser(jwt);

    const team = new TeamDetails({ name });
    // const team = new TeamDetails(
    //   {
    //     name: teamName,
    //     admins: [{adminId: user._id}],
    //     members: [{memberId: user._id}]
    //   }
    // );
    team.admins.push({ adminId: user._id });
    team.members.push({ memberId: user._id });
    team.users.push(user._id);

    await team.save();

    // const members = await TeamDetails.findOne({ name: 'team' }).populate('userauths');
    // console.log(members);

    const tempteam = await TeamDetails.findOne({ name: 'team' });
    let members = [];
    tempteam.members.forEach(async (member) => {
      members.push(member);
      // const user = await UserAuth.findOne({ _id: member.memberId });
      // members.push(user.publicKey);
    });

    // const memberPromise =
    members = await Promise.all(
      members.map(async (member) => {
        const user = await UserAuth.findOne({ _id: member.memberId });
        return user.publicKey;
      })
    );

    // Promise.all(memberPromise);
    console.log(members);

    res.status(201).json({ msg: `Created team ${name}!` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
