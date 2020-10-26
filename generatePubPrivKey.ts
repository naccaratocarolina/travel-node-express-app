/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
// @ts-ignore
//Usaremos a biblioteca do node crypto
const crypto = require('crypto');
// @ts-ignore
const fs = require('fs');

function genKeyPair() {

    // @ts-ignore
    // Gera as chaves publicKey e privateKey usando o algoritmo RSA
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' //Formato mais comum para esse tipo de arquivo
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' //Formato mais comum para esse tipo de arquivo
        }
    });

    //Cria o arquivo com a chave publica
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

    //Cria o arquivo com a chave privada
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

//Gera o par chave publica e privada
genKeyPair();
