import { Schema, models, model } from 'mongoose';
import TeamDetails from './TeamDetails';
const jwt = require('jsonwebtoken');
const openpgp = require('openpgp');

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
  ],
  teams: [
    {
      team: {
        type: Schema.Types.ObjectId,
        ref: 'TeamDetails'
      }
    }
  ],
  publicKey: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  }
});

/* create a jsonwebtoken */
UserAuth.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens.push({ token });
  await user.save();
  return token;
};

UserAuth.methods.storeKeys = async function (publicKey, privateKey) {
  const user = this;

  /* convert private key into message object for encryption */
  const message = openpgp.Message.fromText(privateKey);

  user.publicKey = publicKey;
  user.privateKey = await openpgp.encrypt({
    message,
    passwords: user.password
  });

  await user.save();
};

/* if User schema already exists, don't overwrite it */
export default models.UserAuth || model('UserAuth', UserAuth);
