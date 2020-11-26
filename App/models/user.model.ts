const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            unique: false,
            required: false
        },

        email: {
            type: String,
            unique: [true, "Esse email já existe :("],
            required: [true, "Voce esqueceu de inserir o seu email :)"]
        },

        hash: {
            type: String,
            unique: false,
            required: true
        },

        salt: {
            type: String,
            unique: false,
            required: true
        },

        role: {
            type: String,
            default: "User",
            enum: ["User", "Admin"]
        },

        ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}]
    },
    { timestamps: true, collection: "users" }
);

module.exports = model('User', userSchema);
export {};
