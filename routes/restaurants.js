var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');
var Comments = require('../models/comments');
var app = express();
var moment = require('moment');
var _ = require('lodash');

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
    Restaurants
      .findOne({"restaurant_id": id})
      .populate('comments')
      .then((restaurant) => {
         console.log(restaurant);
    _.each(restaurant.grades, (data) => data.date = moment(data.date).format('DD/MM/YYYY'));
    res.render('restaurant/index', {restaurant});
  });
});





router.post('/view/:restaurant_id', function(req,res){
	Restaurants
		.findOne({ restaurant_id: req.params.restaurant_id})
		.then((restaurant) => {
			const commentform = Object.assign({},req.body,{restaurant})
			return Comments.create(commentform,(err, comment) => {
							if(err) console.log('ERROR :', err)
						});
		})
		.then((comment) => {
			// Need to find a proper way to return the updated restaurant
			Restaurants
				.update(
				  { restaurant_id: req.params.restaurant_id},
				  { $push:{ "comments": comment._id}},
				  { upsert:true }
				 )
				.exec()
			Restaurants
				.findOne({ restaurant_id: req.params.restaurant_id})
				.populate('comments')
				.then(
					(restaurant) => res.render('restaurant/index', {restaurant}),
					(err) => console.log(err)
				);
		});
});





module.exports = router;
