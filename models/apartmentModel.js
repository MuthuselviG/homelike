const mongoose = require("../config/db");
const userModel = require("./userModel");

const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    name: {
        desc: "apartment  name",
        type: String,
        required: true,
    },
    address: {
        desc: "address of apartment",
        type: String,
        required: true,
    },
    city: {
        desc: "city where the apartment is located",
        type: String,
        required: true,
    },
    country: {
        desc: "country where the apartment is located",
        type: String,
        required: true,
    },
    geo: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            required: true,
            type: [Number], // the order is longitude, latitude
        },
    },
    noOfRooms: {
        desc: "Number of rooms",
        type: Number,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: "userModel" }
}, {
    collation: { locale: 'en', strength: 2 }
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

schema.index({ geo: "2dsphere" });

schema.index({ city: 1 });
schema.index({ country: 1 });
schema.index({ noOfRooms: 1 });

module.exports = mongoose.model("Apartment", schema);