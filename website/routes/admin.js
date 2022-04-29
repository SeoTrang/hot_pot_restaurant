var express = require('express');
var router = express.Router();

var admin = require('../controllers/admin.controller');

// upload.single('img'),
// ,upload.array('imgInfo',10)
// ----------middleware upload file
const multer  = require('multer');
const upload = multer({ dest: 'public/images/food/' });



// product
router.get('/addproduct',admin.addProduct);
router.post('/store-product',upload.array('img',20),admin.storeProduct);
router.get('/products',admin.middlewareCategorys,admin.viewProduct);
router.get('/products/:slug',admin.middlewareCategorys,
                            admin.viewProductMiddleware,
                            admin.viewProductByCategory);


// booked
router.get('/check-table-status',admin.checkTime);
router.get('/booked',admin.booked);

router.get('/add-new-order',admin.middlewareProducts,
                            admin.middlewareTables,
                            admin.middlewareCategorys,
                            admin.addNewOrder);

router.post('/store-order',admin.storeOrder);
router.get('/wait-for-confirmation',admin.waitForConfirmation);


// category
router.get('/categorys',admin.categorys);
router.post('/store-category',admin.storeCategory);



// table
router.get('/tables',admin.tables);
router.post('/store-table',admin.storeTables);


// home
router.get('/',admin.homeAdmin);

module.exports = router;
