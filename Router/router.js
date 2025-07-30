const express = require('express');
const router = express.Router();
const userController = require('../Controllers/Users/user.controller');
const vendorController = require('../Controllers/Vendor/vendor.controller');
const organizationController = require('../Controllers/Organization/organization.controller');


router.post('/createVendor', vendorController.createVendor);
router.post('/createUser', userController.createUser);
router.get('/businessTypes', organizationController.businessTypes);
router.get('/userTypes', userController.userTypes);
router.post('/login', userController.login);



module.exports = router;