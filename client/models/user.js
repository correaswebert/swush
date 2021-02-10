import { Schema, models, model } from "mongoose";
import Team from "./teams"
const jwt = require('jsonwebtoken');

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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// UserSchema.virtual('teamOwner', {
//   ref: 'Team',
//   localField: '_id',
//   foreignField: 'owner'
// });

/* create a jsonwebtoken */
UserSchema.methods.generateAuthToken = async function(){
  const user = this;
  const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({token});
  await user.save();
}

/* if User schema already exists, don't overwrite it */
export default models.User || model("User", UserSchema);
