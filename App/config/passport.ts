//Importando a estrategia do passport jwt
const JwtStrategy = require('passport-jwt').Strategy;

//Importando o extract jwt, que sera responsavel por definir o metodo de extracao do token
const ExtractJwt = require('passport-jwt').ExtractJwt;

// @ts-ignore
const User = require('../models/user.model.ts');

//Importando a chave publica
// @ts-ignore
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '../../', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

//Opcoes para criar a estrategia
const options = {
    //Indica que receberemos o token na header de autenticacao
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    //Usaremos a chave publica pois iremos encriptar dados
    secretOrKey: PUB_KEY,

    //Especifica o algoritmo de criptografia
    algorithms: ['RS256']
}

//server.js vai passar o objeto passport global aqui, e esta funcao vai configura-lo
module.exports = (passport) => {
    //Definimos a estrategia a ser usada e configuramos ela usando a propriedade options
    passport.use(new JwtStrategy(options, function (payload, done) {
        //A propriedade sub carrega o id do usuario, que eh representado pela variavel payload
        User.findOne({ _id: payload.sub }, function (err, user) {
            //Se um erro for encontrado
            if(err) return done(err, false);

            //Em caso de sucesso
            if(user) return done(null, user);

            //Se o usuario nao for encontrado
            return done(null, false);
        });
    }));
}
