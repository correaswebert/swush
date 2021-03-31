import { Schema, models, model } from 'mongoose';

const TeamDetails = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  admins: [
    {
      adminId: {
        type: Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true
      }
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserAuth',
      required: true
    }
  ],
  members: [
    {
      memberId: {
        type: Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true
      }
    }
  ],
  secrets: [
    {
      name: String
    }
  ]
});

/* assign admin for the team */
TeamDetails.methods.assignAdmin = async function (id) {
  const team = this;
  const admin = id;
  const member = id;
  team.admins = team.admins.concat({ admin });
  team.members = team.members.concat({ member });
  await team.save();
};

/* if TeamDetails schema already exists, don't overwrite it */
export default models.TeamDetails || model('TeamDetails', TeamDetails);
