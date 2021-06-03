const mongoose = require("../config/db");
const apartmentModel = require("./apartmentModel");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    email: {
        desc: "The user's email address.",
        trim: true,
        type: String,
        index: true,
        unique: true,
    },
    name: {
        desc: "The user's name.",
        trim: true,
        type: String,
        required: true,
    },
    password: {
        desc: "the user's password",
        trim: true,
        type: String,
        required: true
    },
    apartments: [{ type: Schema.Types.ObjectId, ref: "apartmentModel" }],
    favoriteApartments: [{ type: Schema.Types.ObjectId, ref: "apartmentModel" }]

}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
module.exports = mongoose.model("User", schema);