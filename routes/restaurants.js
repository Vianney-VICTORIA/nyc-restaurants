var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');
var Comments = require('../models/comments');
var app = express();
var moment = require('moment');

router.get('/', function(req, res, next) {

  var restaurants;
  var boroughs;
  var cuisines;
  var boroughFilter = req.query.borough;
  var cuisineFilter = req.query.cuisine;
  var thisPage = req.query.p ? req.query.p : 1;

  Restaurants.findRestaurant(thisPage, boroughFilter, cuisineFilter)
  .then((results, cuisineFilter, boroughFilter) => {
    restaurants = results;
    console.log(restaurants);
    return Restaurants.byBorough().exec();
  }).then((results) => {
    boroughs = results;
  	return Restaurants.byCuisine().exec();
  }).then((results) => {
    cuisines = results;
  	res.render('restaurants/index', {restaurants, boroughs, cuisines, cuisineFilter, boroughFilter, thisPage});
  });
});


router.get('/view/:id', function(req, res) {
	var id = req.params.id;
  Restaurants.findOne({"restaurant_id": id}).exec().then((restaurant) => {
    console.log(restaurant);
    res.render('restaurant/index', {restaurant});
  });
});


router.post('/view/:id', function(req, res) {
    Comments.create({content : {
                       "author": req.body.author, 
                       "text": req.body.content,
                       "date": moment().format('DD/MM/YYYY')
                     },
                     id_restaurant: req.params.id
                   }).then(() => {
    console.log(req.params.id);
    res.redirect('/restaurant/index');
  });
});

module.exports = router;
