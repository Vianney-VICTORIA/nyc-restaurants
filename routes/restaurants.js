var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');
var app = express();

router.get('/', function(req, res, next) {
  var restaurants;
  var boroughs;
  var cuisines;
  var boroughFilter = req.query.borough;
  var cuisineFilter = req.query.cuisine;
  Restaurants.findRestaurant(boroughFilter, cuisineFilter)
    .exec().then((results, boroughFilter, cuisineFilter) => {
    	restaurants = results;
      boroughFilter = req.query.borough;
      cuisineFilter = req.query.cuisine;
    	return Restaurants.byBorough().exec();
  }).then((results) => {
  	boroughs = results;
  	return Restaurants.byCuisine().exec();
  }).then((results) => {
  	cuisines = results;
  	res.render('restaurants/index', {restaurants, boroughs, cuisines, boroughFilter, cuisineFilter});
  });
});
  
router.get('/view/:id', function(req, res) {
	var id = req.params.id;
  Restaurants.findOne({"restaurant_id": id}).exec().then((restaurant) => {
    res.render('restaurant/index', {restaurant});
  });
});

module.exports = router;
