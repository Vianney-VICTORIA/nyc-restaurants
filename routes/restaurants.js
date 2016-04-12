var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');
var app = express();

router.get('/', function(req, res, next) {
  var restaurants;
  var boroughs;
  var cuisines;
  Restaurants.findRestaurant(borough, cuisine).exec().then((results) => {
  	restaurants = results;
  	return Restaurants.byBorough().exec();
  }).then((results) => {
  	boroughs = results;
  	console.log(boroughs);
  	return Restaurants.byCuisine().exec();
  }).then((results) => {
  	cuisines = results;
  	console.log(cuisines);
  	res.render('restaurants/index', {restaurants, boroughs, cuisines});
  });
});

router.get('/view/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	res.render('restaurant/index', {});
});


module.exports = router;
