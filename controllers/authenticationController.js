const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken"); // jsonwebtoken module for create token


exports.signupUser = async (req, res) => {
    console.log(req.body)
    try {
        let { email,password,name } = req.body;
        let user = new User({ "name": name, "email": email });

        // hash password
        user.password = await bcrypt.hash(password, 3);
        // Save to DB
        let savedUser = await user.save();
   
        logger.info("Created new account!");
        // signing options
        var signOptions = {
            expiresIn: process.env.TOKEN_LIFE
        };

        //generating JWT
        let token = jwt.sign({ savedUser }, process.env.TOKEN_SECRET, signOptions);
        req.session.user = savedUser;
        res.cookie("token", token);
        res.setHeader("content-type", "application/json");
        res.status(200).send({
            message: "Created account",
            id: savedUser._id,
            token: token
        });
    }
    catch(err){
        if (err.code && err.code == 11000) {
            logger.error("Account already exists");
            res.status(409).send({
                message: "Account already exists! Try login!"
            });
        }
        else {
            logger.error("Error in signup "+err.message);
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while creating the account."
            });
        }
    };
   
                        
  
};

//user login
exports.login = async (req, res) => {
    console.log(req.body)
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).send({ status: 404, message: "User not found!" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            logger.info("Password matches ? " + isMatch);
            if (isMatch) {
                // signing options
                var signOptions = {
                    expiresIn: process.env.TOKEN_LIFE
                };
                req.session.user = user;

                //generating JWT
                let token = jwt.sign({ user }, process.env.TOKEN_SECRET, signOptions);

                res.cookie("token", token);
                res.setHeader("content-type", "application/json");
                res.status(200).send({
                    message: "Login successful!",
                    id: user._id,
                    token: token
                });
            } else {
                res.status(400).send({ status: 400, message: "Invalid Password" });
            }
        }
    } catch (err) {
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while creating the account."
            });
        }
    
};

exports.logout = async (req, res) => {
    req.session.destroy(function () {
        logger.info("user logged out.")
    });
    res.status(200).send();
  
};

