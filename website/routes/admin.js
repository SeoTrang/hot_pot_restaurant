var express = require('express');
var router = express.Router();

var admin = require('../controllers/admin.controller');

/* GET users listing. */
router.get('/addproduct',admin.addProduct);
router.get('/booked',admin.booked);
router.get('/products',admin.viewProduct);
router.get('/add-new-order',admin.addNewOrder);
router.get('/wait-for-confirmation',admin.waitForConfirmation);
router.get('/categorys',admin.categorys);
router.get('/tables',admin.tables);

router.get('/',admin.home);

module.exports = router;
