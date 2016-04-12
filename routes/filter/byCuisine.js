var express = require('express');
var router = express.Router();
var Restaurants = require('.../models/restaurants');
var app = express();

var RestaurantFiltredByCuisine = new Restaurants;

app.get('/restaurants', restaurants);

RestaurantFiltredByCuisine.cuisineFilter = function() {
	return this.model('Restaurant').aggregate([{$group: { _id: "$cuisine"}}]);
};

router.get('/', function(req, res, next) {
  RestaurantFiltredByCuisine.cuisineFilter().exec().then((cuisines) => {
    res.render('restaurants/filter/byCuisine', {cuisines: cuisines});
  });
});

module.exports = router;
