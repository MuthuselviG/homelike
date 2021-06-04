let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let db = require("./config/db");
const router = express.Router();
const Auth = require("./middleware/jwtAuthentication");
const logger = require("./config/logger");

require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(cors());


var session = require("express-session");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(session({ secret: process.env.TOKEN_SECRET , resave: true, saveUninitialized: true}));

/**
 * parse requests of content-type - application/json
 */
app.use(bodyParser.json());
/**
 * parse requests of content-type - application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));

// middleware to fix the html error thrown when json format is wrong
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
});
app.use("/", router);

// base URLs
app.use("/apartment", Auth.authenticateJWT, require("./routes/apartmentRoute"));

app.use("/auth", require("./routes/authenticationRoute"));
app.use("/logout", Auth.authenticateJWT,require("./routes/authenticationRoute"));

app.listen(process.env.PORT);
logger.info("REST API server started on : " + process.env.port);

// URL List
logger.info("POST user signup .............." + "/signup");
logger.info("POST user login ..............." + "/login");
logger.info("POST user logout .............." + "/logout");
logger.info("POST apartment ................" + "/apartment/add");
logger.info("GET search apartment..........." + "/apartment/search");
logger.info("PUT user favourites ..........." + "/apartment/favourite");
logger.info("GET user favourites ..........." + "/apartment/favourite");

module.exports = app;