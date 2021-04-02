import { Schema, models, model } from 'mongoose';
const jwt = require('jsonwebtoken');
const openpgp = require('openpgp');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        _id: false,
        type: String,
        required: true,
      },
    },
  ],
  teams: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
    },
  ],
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
});

/* create a jsonwebtoken */
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens.push({ token });
  await user.save();
  return token;
};

UserSchema.methods.storeKeys = async function (publicKey, privateKey) {
  const user = this;

  /* convert private key into message object for encryption */
  const message = openpgp.Message.fromText(privateKey);

  user.publicKey = publicKey;
  user.privateKey = await openpgp.encrypt({
    message,
    passwords: user.password,
  });

  await user.save();
};

/* if UserSchema already exists, don't overwrite it */
export default models.User || model('User', UserSchema);
