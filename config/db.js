const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", true);
const logger = require("./logger");


require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(process.env.MONGO, { useNewUrlParser: true },
    (err) => {
        if (!err) {
            logger.info("Successfully Established Connection with MongoDB");
        } else {
            logger.error(
                "Failed to Establish Connection with MongoDB with Error: " + err
            );
        }
    }
);
module.exports = mongoose;