import { Schema, models, model } from 'mongoose';
const openpgp = require('openpgp');

const secretSchema = new Schema({
  name: String,
  secret: String,
  fileName: String,
});

const VaultSchema = new Schema({
  name: String,
  ssh: [secretSchema],
  oauth: [secretSchema],
  password: [secretSchema],
  file: [secretSchema],
});

/**
 * @param {*} type indicates type of secret
 * @param {*} name indicates description of the secret
 * @param {*} secret is the encrypted secret
 */
VaultSchema.methods.addSecret = async function (type, name, secret, fileName) {
  const vault = this;
  if (type == 'ssh') {
    vault.ssh.push({ name, secret });
    await vault.save();
    return;
  } else if (type == 'oauth') {
    vault.oauth.push({ name, secret });
    await vault.save();
    return;
  } else if (type == 'password') {
    vault.password.push({ name, secret });
    await vault.save();
    return;
  } else if (type == 'file') {
    vault.file.push({ name, secret, fileName });
    await vault.save();
    return;
  }
};

VaultSchema.methods.reEncrypt = async function (publicKeys, privateKey) {
  const vault = this;

  const publicKeysArmored = publicKeys;

  /* read the armored key */
  const privKey = await openpgp.readKey({ armoredKey: privateKey });
  const passphrase = process.env.PASSPHRASE;

  /* decrypt it using passphrase */
  await privKey.decrypt(passphrase);

  if (typeof vault.ssh !== undefined) {
    var ssh_secret = vault.ssh;
  }
  if (typeof vault.oauth !== undefined) {
    var oauth_secret = vault.oauth;
  }
  if (typeof vault.password !== undefined) {
    var password_secret = vault.password;
  }
  if (typeof vault.file !== undefined) {
    var file_secret = vault.file;
  }
  var msg;

  /* read all the armored public keys */
  const pubKeys = await Promise.all(
    publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  );

  if (ssh_secret) {
    ssh_secret.forEach(async (secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });

      /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey,
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);

      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);

      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys,
      });
    });
  }

  if (oauth_secret) {
    oauth_secret.forEach(async (secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });

      /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey,
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);

      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);

      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys,
      });
    });
  }

  if (password_secret) {
    password_secret.forEach(async (secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });

      /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey,
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);
      console.log(plaintext);
      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);

      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys,
      });
    });
  }
  if (file_secret) {
    file_secret.forEach(async (secret) => {
      msg = secret.secret;
      var message = await openpgp.readMessage({ armoredMessage: msg });

      /* decrypt the secret */
      const decrypted = await openpgp.decrypt({
        message,
        privateKeys: privKey,
      });

      /* convert decrypted data into plain text */
      const plaintext = await openpgp.stream.readToEnd(decrypted.data);

      /* convert the decrypted secret into message object */
      message = openpgp.Message.fromText(plaintext);

      /* encrypt the data with the updated keyring */
      secret.secret = await openpgp.encrypt({
        message,
        publicKeys: pubKeys,
      });
    });
  }

  await vault.save();
};

VaultSchema.methods.decryption = async function (privateKey) {
  const vault = this;

  /* read the armored key */
  const privKey = await openpgp.readKey({ armoredKey: privateKey });
  const passphrase = process.env.PASSPHRASE;

  /* decrypt it using passphrase */
  // await privKey.decrypt(passphrase);

  if (typeof vault.ssh !== undefined) {
    var ssh_secret = vault.ssh;
  }
  if (typeof vault.oauth !== undefined) {
    var oauth_secret = vault.oauth;
  }
  if (typeof vault.password !== undefined) {
    var password_secret = vault.password;
  }
  if (typeof vault.file !== undefined) {
    var file_secret = vault.file;
  }
  var msg;
  var secretId = [];
  var filename = [];

  if (ssh_secret) {
    var ssh = [];
    var sshDes = [];

    ssh_secret.forEach((secret) => {
      sshDes.push(secret.name);
      secretId.push(secret._id);
      filename.push('ssh');
    });

    ssh = await Promise.all(
      ssh_secret.map(async (secret) => {
        msg = secret.secret;
        var message = await openpgp.readMessage({ armoredMessage: msg });

        /* decrypt the secret */
        const decrypted = await openpgp.decrypt({
          message,
          privateKeys: privKey,
        });

        /* convert decrypted data into plain text */
        const plaintext = await openpgp.stream.readToEnd(decrypted.data);
        return plaintext;
      })
    );
  }

  if (oauth_secret) {
    var oauth = [];
    var oauthDes = [];

    oauth_secret.forEach((secret) => {
      oauthDes.push(secret.name);
      secretId.push(secret._id);
      filename.push('oauth');
    });

    oauth = await Promise.all(
      oauth_secret.map(async (secret) => {
        msg = secret.secret;
        var message = await openpgp.readMessage({ armoredMessage: msg });

        /* decrypt the secret */
        const decrypted = await openpgp.decrypt({
          message,
          privateKeys: privKey,
        });

        /* convert decrypted data into plain text */
        const plaintext = await openpgp.stream.readToEnd(decrypted.data);
        return plaintext;
      })
    );
  }

  if (password_secret) {
    var password = [];
    var passDes = [];

    password_secret.forEach((secret) => {
      passDes.push(secret.name);
      secretId.push(secret._id);
      filename.push('pass');
    });

    password = await Promise.all(
      password_secret.map(async (secret) => {
        msg = secret.secret;
        var message = await openpgp.readMessage({ armoredMessage: msg });

        /* decrypt the secret */
        const decrypted = await openpgp.decrypt({
          message,
          privateKeys: privKey,
        });

        /* convert decrypted data into plain text */
        const plaintext = await openpgp.stream.readToEnd(decrypted.data);
        return plaintext;
      })
    );
  }
  if (file_secret) {
    var files = [];
    var fileDes = [];

    file_secret.forEach((secret) => {
      fileDes.push(secret.name);
      secretId.push(secret._id);
      filename.push(secret.fileName);
    });

    files = await Promise.all(
      file_secret.map(async (secret) => {
        msg = secret.secret;
        var message = await openpgp.readMessage({ armoredMessage: msg });

        /* decrypt the secret */
        const decrypted = await openpgp.decrypt({
          message,
          privateKeys: privKey,
        });

        /* convert decrypted data into plain text */
        const plaintext = await openpgp.stream.readToEnd(decrypted.data);
        return plaintext;
      })
    );
  }
  const secrets = {
    secretId,
    sshDescription: sshDes,
    SSH: ssh,
    oauthDescription: oauthDes,
    OAuth: oauth,
    passwordDescription: passDes,
    Password: password,
    Files: files,
    filesDescription: fileDes,
    filename,
  };

  return secrets;
};
/* if TeamSchema schema already exists, don't overwrite it */
export default models.Vault || model('Vault', VaultSchema);
