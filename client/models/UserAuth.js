import { Schema, models, model } from 'mongoose';
// import TeamDetails from "./TeamDetails"
const jwt = require('jsonwebtoken');

const UserAuth = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

/* create a jsonwebtoken */
UserAuth.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
};

/* if User schema already exists, don't overwrite it */
export default models.UserAuth || model('UserAuth', UserAuth);
