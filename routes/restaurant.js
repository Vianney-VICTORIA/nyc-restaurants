var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
  res.render('restaurant/index', {});
});

module.exports = router;
