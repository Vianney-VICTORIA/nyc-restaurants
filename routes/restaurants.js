var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');
var app = express();
var Restaurant = new Restaurants;

Restaurant.findRestaurant = function() {
	return this.model('Restaurant').find({"name": {"$ne": ""}}).limit(10).sort({name: 1});
};
	
router.get('/', function(req, res, next) {
  Restaurant.findRestaurant().exec()
 
  .then((datas) => {
  	res.render('restaurants/index', {datas: datas});
  });
});

router.get('/view/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	res.render('restaurant/index', {});
});


module.exports = router;
