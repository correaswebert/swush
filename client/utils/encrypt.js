export default async function () {
  const publicKeysArmored = [
    `-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----`,
    `-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----`
  ];
  const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
...
-----END PGP PRIVATE KEY BLOCK-----`;
  const passphrase = `yourPassphrase`;
  const message = 'Hello, World!';

  const publicKeys = await Promise.all(
    publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  );

  const privateKey = await openpgp.readKey({ armoredKey: privateKeyArmored });
  await privateKey.decrypt(passphrase);

  const message = openpgp.Message.fromText(message);
  const encrypted = await openpgp.encrypt({
    message,
    publicKeys,
    privateKeys: privateKey
  });
  console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
}
