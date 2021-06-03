const express = require("express");
const router = express.Router();
const validate = require('../middleware/validator');
const apartmentController = require("../controllers/apartmentController");

router.post("/add", validate.addApartmentParams, apartmentController.addApartment);
router.get("/search", apartmentController.searchApartments);
router.put("/favorite", validate.favoriteParams, apartmentController.favoriteApartment);
router.get("/favorite", apartmentController.fetchFavoriteApartments);

module.exports = router;
