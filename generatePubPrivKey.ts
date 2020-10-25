/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
// @ts-ignore
const crypto = require('crypto');
const fs = require('fs');

function genKeyPair() {

    // Gera as chaves publicKey e privateKey
    // @ts-ignore
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
    });

    // Cria o arquivo com a chave publica
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

    // Cria o arquivo com a chave privada
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);

}

// Generate the keypair
genKeyPair();
