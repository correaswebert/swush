const jwt = require('jsonwebtoken');
import UserAuth from 'models/UserAuth';

/**
 * Check if the token provided is valid. If yes, then get the corresponding
 * user from the database.
 */
export default async function getAuthenticatedUser(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserAuth.findOne({ _id: decoded._id, 'tokens.token': token });
    return user;
  } catch (error) {
    throw new Error('Authentication error!');
    // res.status(401).send({ Error: 'Authentication error!' });
  }
}
