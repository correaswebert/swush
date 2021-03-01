import { Schema, models, model } from 'mongoose';

const UserDetails = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  teams: [
    {
      team_id: Schema.Types.ObjectId
    }
  ]
});

/* if UserDetails schema already exists, don't overwrite it */
export default models.UserDetails || model('UserDetails', UserDetails);
