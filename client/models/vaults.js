import { Schema, models, model } from 'mongoose';

const secretSchema = new Schema({
  name: String,
  secret: String,
});

const VaultSchema = new Schema({
  name: String,
  ssh: [secretSchema],
  oauth: [secretSchema],
});

/* if TeamSchema schema already exists, don't overwrite it */
export default models.Vault || model('Vault', VaultSchema);
