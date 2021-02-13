import { Schema, models, model } from "mongoose";

const TeamDetails = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  admins: {
    type: Schema.Types.Array,
    required: true,
  },
});

/* if TeamDetails schema already exists, don't overwrite it */
export default models.TeamDetails || model("TeamDetails", TeamDetails);
