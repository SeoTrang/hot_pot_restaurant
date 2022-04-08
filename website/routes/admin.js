var express = require('express');
var router = express.Router();

var admin = require('../controllers/admin.controller');

/* GET users listing. */
router.get('/addproduct',admin.addProduct);
router.get('/booked',admin.booked);
router.get('/products',admin.viewProduct);
router.get('/',admin.home);

module.exports = router;
