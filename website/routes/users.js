var express = require('express');
var router = express.Router();

var userCotrollers = require('../controllers/user.controller');

/* GET users listing. */
router.get('/monan',userCotrollers.monan);
router.get('/gioithieu',userCotrollers.gioithieu);
router.get('/detail',userCotrollers.chitiet);
router.get('/check-table-status',userCotrollers.checkTableStatus);
router.get('/book',userCotrollers.book);
router.get('/',userCotrollers.home);

module.exports = router;
