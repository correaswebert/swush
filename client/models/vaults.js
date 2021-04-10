import { Schema, models, model } from 'mongoose';
const openpgp = require('openpgp');

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

VaultSchema.methods.reEncrypt = async function (publicKeys, privateKey) {
  const vault = this;
  
  const publicKeysArmored = publicKeys;

  /* read the armored key */
  const privKey = await openpgp.readKey({ armoredKey: privateKey });
  const passphrase = process.env.PASSPHRASE;

  /* decrypt it using passphrase */
  await privKey.decrypt(passphrase);

  if(typeof vault.ssh !== undefined){
    var ssh_secret = vault.ssh;
  }
  if(typeof vault.oauth !== undefined){
    var oauth_secret = vault.oauth;
  }
  if(typeof vault.password !== undefined){
    var password_secret = vault.password;
  }

  var msg;

  /* read all the armored public keys */
  const pubKeys = await Promise.all(
    publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  );

  if(ssh_secret){
    ssh_secret.forEach(async(secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });

      /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);
      
      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);

      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys
      });
    });
  }

  if(oauth_secret){
    oauth_secret.forEach(async(secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });

      /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);
      
      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);
      
      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys
      });
    });
  }

  if(password_secret){
    password_secret.forEach(async(secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });
      
    /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);
      console.log(plaintext);
      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);

      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys
      });
     });
  }

  await vault.save();
};
/* if TeamSchema schema already exists, don't overwrite it */
export default models.Vault || model('Vault', VaultSchema);
