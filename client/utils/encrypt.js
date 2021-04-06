const openpgp = require('openpgp');

export default async function encryptSecret(publicKeys, ssh=null, oauth=null, password=null) {
  const publicKeysArmored = publicKeys;
  var msg = "";
  
  /* check the type of secret */
  if(ssh){
    msg = ssh;
  }
  else if(oauth){
    msg = oauth;
  }
  else if(password){
    msg = password;
  }

  const pubKeys = await Promise.all(
    publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  );

  const message = openpgp.Message.fromText(msg);
  const encrypted = await openpgp.encrypt({
    message,
    publicKeys: pubKeys
  });

  console.log(encrypted);
  return encrypted;
}
