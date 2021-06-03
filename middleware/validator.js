const { check, validationResult } = require('express-validator');

// validate signup
exports.validateUser = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password should have min 8 chars!')
        .bail()
        .isLength({ max: 100})
        .withMessage('Password should not be more than 100 chars!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ message: errors.array() });
        next();
    },
];


// validate login params
exports.loginParams = [
    check('email')
        .not().isEmpty()
        .withMessage('Email Empty')
        .bail(),
    check('password')
        .not().isEmpty()
        .withMessage('Password Empty')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ message: errors.array() });
        next();
    },
];


// validate add apartment params
exports.addApartmentParams = [
    check('name')
        .not().isEmpty()
        .withMessage('Name is Empty')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Name min 5 chars')
        .bail(),
    check('city')
        .not().isEmpty()
        .withMessage('City is Empty')
        .bail(),
    check('address')
        .not().isEmpty()
        .withMessage('Address (address) is Empty')
        .bail(),
    check('lat')
        .not().isEmpty()
        .withMessage('Latitude (lat) is Empty')
        .bail(),
    check('lon')
        .not().isEmpty()
        .withMessage('Longitude (lon) is Empty')
        .bail(),
    check('noOfRooms')
        .not().isEmpty()
        .withMessage('Number of Rooms is Empty')
        .bail(),
    check('country')
        .not().isEmpty()
        .withMessage('country is Empty')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ message: errors.array() });
        next();
    },
];


// validate favorite params
exports.favoriteParams = [
    check('apartmentId')
        .not().isEmpty()
        .withMessage('apartment id Empty')
        .bail(),
    check('save')
        .isBoolean()
        .withMessage('save flag Empty')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ message: errors.array() });
        next();
    },
];
