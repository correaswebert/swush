import { Schema, models, model } from 'mongoose';

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  admins: [
    {
      adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
  members: [
    {
      memberId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
  vault: {
    type: Schema.Types.ObjectId,
    ref: 'Vault',
    required: true,
  },
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

/* if TeamSchema schema already exists, don't overwrite it */
export default models.Team || model('Team', TeamSchema);
