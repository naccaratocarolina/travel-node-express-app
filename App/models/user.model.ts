const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            unique: false,
            required: [true, "Voce esqueceu de inserir o seu nome :)"]
        },

        email: {
            type: String,
            unique: [true, "Esse email já existe :("],
            required: [true, "Voce esqueceu de inserir o seu email :)"]
        },

        password: {
            type: String,
            unique: false,
            required: [true, "Voce esqueceu de inserir a sua senha :)"]
        }
    },
    { timestamps: true, collection: "users" }
);

module.exports = model('User', userSchema);