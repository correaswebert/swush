import { Schema, models, model } from "mongoose";

const GpgStore = new Schema({
  GpgKeys: Schema.Types.Array,
});

/* if GpgStore schema already exists, don't overwrite it */
export default models.GpgStore || model("GpgStore", GpgStore);
