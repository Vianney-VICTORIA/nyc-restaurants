const mongoose = require('mongoose');

const RestaurantsSchema = new mongoose.Schema({
      adress: [{
         coord: [],
         street: { type : String, default : '', trim : true },
         zipcode: { type : String, default : '', trim : true },
      }],
      borought: { type : String, default : '', trim : true },
      cuisine: { type : String, default : '', trim : true },
      comments: [{
         date: { type : Date, default : Date.now },
         grade: { type : String, default : '', trim : true },
         score: { type : Number, default : '' }
      }],
      name: { type : String, default : '', trim : true },
      restaurant_id: { type : String, default : '', trim : true },
});

module.exports = mongoose.model('Restaurant', RestaurantsSchema);
