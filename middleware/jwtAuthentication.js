const jwt = require("jsonwebtoken");
const logger = require("../config/logger");


exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (authHeader) {

        //logger.info(authHeader);
        //logger.info(req.session.user);
        jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                logger.error("Error while verifying auth token " + err);
                return res.status(401).send({message: "Login to continue!"});
            } else if (req.session.user) {
                    next();     //If session exists, proceed to page
                } else {
                    return res.status(401).send({message: "Session out"});
                }            
        });
    } else {
        logger.error("AuthHeader not available");
        return res.status(401).send({
            message: "Login to continue!",
            status: 401
        });
    }
};

