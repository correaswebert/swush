import { Schema, models, model } from "mongoose";

const SecretStore = new Schema({
  passwords: Schema.Types.Array,
  sshKeys: Schema.Types.Array,
  oauthTokens: Schema.Types.Array,
});

/* if SecretStore schema already exists, don't overwrite it */
export default models.SecretStore || model("SecretStore", SecretStore);
