const mongoose = require('mongoose');

const RestaurantsSchema = new mongoose.Schema({
      adress: [{
         coord: [],
         street: { type : String, default : '', trim : true },
         zipcode: { type : String, default : '', trim : true },
      }],
      comments: [{
         text: { type : String, default : '', trim : true },
      }],
      borough: { type : String, default : '', trim : true },
      cuisine: { type : String, default : '', trim : true },
      grades: [{
         date: { type : Date, default : Date.now },
         grade: { type : String, default : '', trim : true },
         score: { type : Number, default : '' }
      }],
      name: { type : String, default : '', trim : true },
      restaurant_id: { type : String, default : '', trim : true },
});


RestaurantsSchema.statics.findRestaurant = function() {
   return this.find({"name": {"$ne": ""}}).limit(10).sort({name: 1});
};

RestaurantsSchema.statics.byBorough = function() {
   return this.aggregate([{$group: { _id: "$borough"}}]);
};
   
RestaurantsSchema.statics.byCuisine = function() {
   return this.aggregate([{$group: { _id: "$cuisine"}}]);
};


module.exports = mongoose.model('Restaurant', RestaurantsSchema);

