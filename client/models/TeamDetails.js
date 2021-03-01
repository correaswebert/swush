import { Schema, models, model } from 'mongoose';

const TeamDetails = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  admins: [
    {
      member_id: Schema.Types.ObjectId,
      required: true
    }
  ]
});

/* if TeamDetails schema already exists, don't overwrite it */
export default models.TeamDetails || model('TeamDetails', TeamDetails);
