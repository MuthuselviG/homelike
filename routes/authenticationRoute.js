const express = require("express");
const router = express.Router();
const validate = require('../middleware/validator');
const authenticationController = require("../controllers/authenticationController");

router.post("/signup", validate.validateUser, authenticationController.signupUser);
router.post("/login", validate.loginParams, authenticationController.login);
router.post("/",  authenticationController.logout);

module.exports = router;