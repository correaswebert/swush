import { Schema, models, model } from 'mongoose';

const ValutSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  ssh: [
    {
      name: Schema.Types.ObjectId,
    },
  ],
  oauth: [
    {
      name: Schema.Types.ObjectId,
    },
  ],
});

/* if TeamSchema schema already exists, don't overwrite it */
export default models.Vault || model('Vault', VaultSchema);
