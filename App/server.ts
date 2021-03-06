const express = require("express");

//Importando a middleware que ira processar o body retornado pelas rotas
const bodyParser = require("body-parser");
// processa body que contém arquivos
const multer = require("multer");

//Importando a middleware que fornece suporte de logging automatizado
const logging = require("morgan")("dev");

//Importando imformacoes da database
const { PORT } = require("./config/credentials.ts");
const DBConnection = require("./config/connection.ts");

// Configuração do modulo multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'storage/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const pathModule = require('path');

//Importando as rotas
const appRoutes = require("./routes.ts");

//Criando o App
const app = express();

//Configurando o body-parser para receber um JSON
const bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//Inicializando o router
const router = express.Router();

//Chama a funcao de conecxao da database
DBConnection();

//Configurando o app.use (middlewares da aplicacao)
app.use(logging);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(multer({storage: fileStorage}).single('image'));
app.use('/storage',express.static(pathModule.join(__dirname, 'storage')));

//Setando a middleware com as headers das requisicoes
app.use(function (request, response, next) {
    response.append("Access-Control-Allow-Origin", ["*"]);
    response.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.append("Access-Control-Allow-Headers", "Content-Type", "Authorization");
    next();
});

//Inicializando o router e adicionando o prefixo '/api'
app.use("/api", router);

//Chama as rotas da aplicacao
appRoutes(router);

//Inicializa o server
app.listen(PORT, function () {
    console.log("O aplicativo Express inicializou em http://localhost:" + PORT +
        "\nAperte Crtl+C para encerrar.");
});
