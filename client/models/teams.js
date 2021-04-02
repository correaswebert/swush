import { Schema, models, model } from 'mongoose';

const UserRefSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const VaultRefSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Vault',
  },
});

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  admins: [UserRefSchema],
  members: [UserRefSchema],
  vaults: [VaultRefSchema],
});

/* assign admin for the team */
TeamSchema.methods.assignAdmin = async function (id) {
  const team = this;
  const admin = id;
  const member = id;
  team.admins = team.admins.concat({ admin });
  team.members = team.members.concat({ member });
  await team.save();
};

/* assign admin for the team */
TeamSchema.methods.addMember = async function (userId) {
  const team = this;
  team.members.push({ _id: userId });
  await team.save();
};

/* if TeamSchema schema already exists, don't overwrite it */
export default models.Team || model('Team', TeamSchema);
