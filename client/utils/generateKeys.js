const openpgp = require('openpgp');

export default async function generateKeys(user) {
    const {privateKeyArmored, publicKeyArmored, revocationCertificate} = await openpgp.generateKey({
        type: 'ecc',
        curve: 'curve25519',
        userIds: {name: user.name, email: user.email},
        passphrase: 'secret'
    });
    
    return {privateKey: privateKeyArmored ,publicKey: publicKeyArmored};
}