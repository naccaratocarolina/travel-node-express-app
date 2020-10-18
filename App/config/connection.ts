const mongoose = require('mongoose');
const chalk = require('chalk');
const { DB } = require('./credentials.ts');

//Definindo a cor do texto de output de conexao do mongo no terminal
const connected = chalk.bold.green;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const terminated = chalk.bold.cyan;

module.exports = function () {
    //Conecta com a URL da database
    mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

    //Sucesso (conectado)
    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose conectado com sucesso em: " + DB));
    });

    //Erro
    mongoose.connection.on('error', function (err) {
        console.log(error("Erro de conexão do Mongoose: " + err));
    });

    //Desconectado
    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Conexão do Mongoose desconectada"));
    });

    //Processo encerrado (ctrl+C)
    process.on('SIGINT', function () {
        console.log(terminated("Conexão do Mongoose foi desconectada devido ao encerramento do aplicativo."));
        process.exit(0);
    });
}