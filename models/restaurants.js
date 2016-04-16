const mongoose = require('mongoose');

const RestaurantsSchema = new mongoose.Schema({
      adress: [{
         coord: [],
         street: { type : String, default : '', trim : true },
         zipcode: { type : String, default : '', trim : true },
      }],
      comments: [{
         name: { type : String, default : '', trim : true },
         text: { type : String, default : '', trim : true },
         date: { type : Date, default : Date.now },
      }],
      borough: { type : String, default : '', trim : true },
      cuisine: { type : String, default : '', trim : true },
      grades: {
         date: { type : Date, default : Date.now },
         grade: { type : String, default : '', trim : true },
         score: { type : Number, default : '' },
      },
      name: { type : String, default : '', trim : true },
      restaurant_id: { type : String, default : '', trim : true },
});


RestaurantsSchema.statics.findRestaurant = function(boroughFilter, cuisineFilter) {

   query = {"name": {"$ne": ""}};

   if (cuisineFilter) query = {"name": {"$ne": ""}, "cuisine": cuisineFilter};
   if (boroughFilter) query = {"name": {"$ne": ""}, "borough": boroughFilter};
   if (boroughFilter && cuisineFilter) query = {"name": {"$ne": ""}, "borough": boroughFilter, "cuisine": cuisineFilter};

   return this.find(query).limit(100).sort({name: 1});
};

RestaurantsSchema.statics.byBorough = function() {
   return this.aggregate([{$group: { _id: "$borough"}}]);
};
   
RestaurantsSchema.statics.byCuisine = function() {
   return this.aggregate([{$group: { _id: "$cuisine"}}]);
};


module.exports = mongoose.model('Restaurant', RestaurantsSchema);

