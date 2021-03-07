import { Schema, models, model } from 'mongoose';

const TeamDetails = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  admins: [{
    admin: {
      type: Schema.Types.ObjectId,
      required: true
    }
  }]
});

/* assign admin for the team */
TeamDetails.methods.assignAdmin = async function(id) {
  const team = this;
  const admin = id;
  team.admins = team.admins.concat({ admin });
  await team.save();
};

/* if TeamDetails schema already exists, don't overwrite it */
export default models.TeamDetails || model('TeamDetails', TeamDetails);
