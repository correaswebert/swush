import { Schema, models, model } from 'mongoose';

const SecretStore = new Schema({
  passwords: [
    {
      value: String
    }
  ],
  sshKeys: [
    {
      value: String
    }
  ],
  oauthTokens: [
    {
      value: String
    }
  ]
});

/* if SecretStore schema already exists, don't overwrite it */
export default models.SecretStore || model('SecretStore', SecretStore);
