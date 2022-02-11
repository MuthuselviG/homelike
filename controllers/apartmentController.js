/**
* Apartment controller 
* Author: Muthuselvi
*/
const User = require("../models/userModel");
const Apartment = require("../models/apartmentModel");
const logger = require("../config/logger");
const session = require("express-session");

/**
* this method is to add apartment
*/
exports.addApartment = async (req, res) => {

    try {
        let userId = req.session.user._id;

        logger.info("apartmentController: addApartment");
        let { name, address, city, country, lat, lon, noOfRooms } = req.body;

        const apartment = new Apartment({
            userId: userId,
            name: name,
            address: address,
            city: city,
            country: country,
            noOfRooms: noOfRooms,
            geo: { "type": "Point", "coordinates": [lon, lat] }
        });


        /**
        * Save apartment to database
        */
        let apartmentSaved = await apartment.save();
        await User.findByIdAndUpdate({ _id: userId }, { $push: { apartments: apartmentSaved } });
        logger.info("apartmentController: addApartment saved apartment");
        res.status(200).send({ "apartmentId": apartmentSaved._id });

    } catch (err) {
        logger.error("apartmentController: addApartment: Error adding apartment " + err);
        res.status(500).send({
            message: err.message || "Error adding apartment",
        });
    }
}



/**
* this method is to add/remove favorite apartment for the user
*/
exports.favoriteApartment = (req, res) => {
	let userId = req.session.user._id;

    let { save, apartmentId } = req.body;

    let q = {};
    if (!save) {
        q = {
            $pull: {
                favoriteApartments: apartmentId,
            },
        }
    } else {
        q = {
            $addToSet: {
                favoriteApartments: apartmentId,
            },
        }
    }
    User.findOneAndUpdate({ _id: userId}, q, { new: true })
        .then((data) => {
            logger.info("Updated" + data);
            res.status(200).send();
        })
        .catch((err) => {
            logger.error("Favorite update error " + err.message);
            res.status(500).send({
                message: err.message ||
                    "Favorite update error",
            });
        });
  
};


/**
* this method is to get favorite apartments of the user
*/
exports.fetchFavoriteApartments = (req, res) => {
    let userId = req.session.user._id;
    let favApartments = req.session.user.favoriteApartments;

    if (favApartments.length != 0) {
        Apartment.find({ _id: { $in: favApartments } })
            .then((data) => {
                logger.info("Retrieved fav apartments");
                res.status(200).send({ "apartments": data });
            })
            .catch((err) => {
                logger.error("Favorite get error " + err.message);
                res.status(500).send({
                    message: err.message ||
                        "Favorite get error",
                });
            });

    } else {
        res.status(200).send({ "apartments": favApartments });
    }
    
};


/**
* this method is to search apartments
*/
exports.searchApartments = (req, res) => {
    let query = req.query;

    let q = {};

    if ((query.distance || query.lon || query.lat) && !(query.distance && query.lon && query.lat)) {
        res.status(409).send({ "message": "Distance, lat, lon all three mandatory for distance filter" });
    } else {
        if (query && Object.keys(query).length !== 0 && query.constructor === Object) {
            q["$and"] = [];
        }

        if (query.distance && query.lon && query.lat) {
            q["$and"].push({
                geo:
                {
                    $near:
                    {
                        $geometry: { type: "Point", coordinates: [query.lon, query.lat] }, //lon,lat
                        $maxDistance: query.distance * 1000
                    }
                }
            });
        }
        if (query.city) {
            q["$and"].push({ city: query.city });
        }
        if (query.country) {
            q["$and"].push({ country: query.country });
        }
        if (query.rooms) {
            q["$and"].push({ noOfRooms: query.rooms });
        }

        Apartment.find(q)
            .then((data) => {
                logger.info("Searched apartments");
                res.status(200).send({ "apartments": data });
            })
            .catch((err) => {
                logger.error("Search apartments error " + err.message);
                res.status(500).send({
                    message: err.message ||
                        "Search apartments error ",
                });
            });
    }
};

