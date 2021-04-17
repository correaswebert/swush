const openpgp = require('openpgp');

export default async function encryptSecret(publicKeys, secret) {
  const publicKeysArmored = publicKeys;

  const pubKeys = await Promise.all(
    publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  );

  const message = openpgp.Message.fromText(secret);
  const encrypted = await openpgp.encrypt({
    message,
    publicKeys: pubKeys,
  });

  console.log(encrypted);
  return encrypted;
}
