var express = require('express');
var router = express.Router();
var Restaurants = require('.../models/restaurants');
var app = express();

var RestaurantFiltredByBorough = new Restaurants;

app.get('/restaurants', restaurants);

RestaurantFiltredByBorough.boroughFilter = function() {
	return this.model('Restaurant').aggregate([{$group: { _id: "$borough"}}]);
};

router.get('/', function(req, res, next) {
  RestaurantFiltredByBorough.boroughFilter().exec().then((boroughs) => {
  	res.render('restaurants/filter/byBorough', {boroughs: boroughs});
  });
});

module.exports = router;
