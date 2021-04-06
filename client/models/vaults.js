import { Schema, models, model } from 'mongoose';

const secretSchema = new Schema({
  name: String,
  secret: String,
});

const VaultSchema = new Schema({
  name: String,
  ssh: [secretSchema],
  oauth: [secretSchema],
  password: [secretSchema]
});

/**
 * @param {*} type indicates type of secret
 * @param {*} name indicates description of the secret
 * @param {*} secret is the encrypted secret
 */
VaultSchema.methods.addSecret = async function (type, name, secret) {
  const vault = this;
  if(type == 'ssh'){
    vault.ssh.push({name, secret});
    await vault.save();
    return;
  }
  else if(type == 'oauth'){
    vault.oauth.push({name, secret});
    await vault.save();
    return;
  }
  else if(type == 'password'){
    vault.password.push({name, secret});
    await vault.save();
    return;
  }
}
/* if TeamSchema schema already exists, don't overwrite it */
export default models.Vault || model('Vault', VaultSchema);
