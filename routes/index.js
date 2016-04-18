var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');

// Restaurants.methods.getGrade = () => {
// 	return Restaurants.count{(grades.score)} / Restaurants.count{(grades)};
// } sort(grades.score) // POUR CLASSER LE FIND

/* GET home page. */
router.get('/', function(req, res, next) {
  Restaurants.aggregate([{$unwind: '$grades'},
  						 {$group : {
                         _id: {
                             name:'$name',
                             cuisine:'$cuisine',
                             restaurant_id: '$restaurant_id',
                             comments: '$comments',
                         }, average: {$avg : '$grades.score'}}}
                         ]).limit(10).sort("-average").exec().then((datas) => {
  	console.log(datas);

  	res.render('index', {datas});
  });
});

module.exports = router;
