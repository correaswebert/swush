const jwt = require('jsonwebtoken');
import User from 'models/users';

/**
 * Check if the token provided is valid. If yes, then get the corresponding
 * user from the database.
 */
export default async function getAuthenticatedUser(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }).exec();
    if (!user) throw TypeError;

    return user;
  } catch (error) {
    throw new Error('Authentication error!');
  }
}
