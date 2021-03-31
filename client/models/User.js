import { Schema, model } from 'mongoose';

import UserAuth from 'models/UserAuth';
import UserDetails from 'models/UserDetails';

const UserSchema = new Schema({
  auth: UserAuth,
  details: UserDetails
});

export default model('user', UserSchema);
