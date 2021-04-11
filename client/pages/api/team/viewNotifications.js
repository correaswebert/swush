import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';

export default async (req, res) => {
  try{
    await connectToDatabase();

    const { jwt } = req.body;

    /* authenticate the user */
    const user = await getAuthenticatedUser(jwt);

    const notifications = user.notifications;
    user.notifications = [];
    await user.save();
    
    res.status(200).json({Notifications: notifications});
  }catch(error) {
    return res.status(500).json('Internal server error');
  }
}