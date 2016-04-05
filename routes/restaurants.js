var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');

// Model available :
// eg. Restaurant.find({...}).exec().then(...)

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
  Restaurants.find({}).limit(10).exec().then((data) => {
  	console.log(data);
  	res.render('restaurants/index', {Restaurants});
  });
});

module.exports = router;
