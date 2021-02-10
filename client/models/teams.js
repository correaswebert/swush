import { Schema, models, model } from "mongoose";

const TeamSchema = new Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  }
});

/* if Team schema already exists, don't overwrite it */
export default models.Team || model("Team", TeamSchema);
