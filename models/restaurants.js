const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const RestaurantsSchema = new mongoose.Schema({
      address: [{
         coord: [
           { type: Number, default: ''},
           { type: Number, default: '' }
         ],
         street: { type : String, default : '', trim : true },
         zipcode: { type : String, default : '', trim : true },
      }],
      borough: { type : String, default : '', trim : true },
      cuisine: { type : String, default : '', trim : true },
      grades: [{
         date: { type : Date, default : Date.now },
         grade: { type : String, default : '', trim : true },
         score: { type : Number, default : '', trim : true},
      }],
      name: { type : String, default : '', trim : true },
      restaurant_id: { type : String, default : '', trim : true },
});

RestaurantsSchema.plugin(mongoosePaginate);

RestaurantsSchema.statics.findRestaurant = function(thisPage, boroughFilter, cuisineFilter) {

   query = {name: {"$ne": ""}};

   if (cuisineFilter) query = {name: {"$ne": ""}, "cuisine": cuisineFilter};
   if (boroughFilter) query = {name: {"$ne": ""}, "borough": boroughFilter};
   if (boroughFilter && cuisineFilter) query = {name: {"$ne": ""}, "borough": boroughFilter, "cuisine": cuisineFilter};

   return this.paginate(query, {limit: 10, sort: "name", page: thisPage});
};

RestaurantsSchema.statics.byBorough = function() {
   return this.aggregate([{$group: { _id: "$borough"}}]);
};
   
RestaurantsSchema.statics.byCuisine = function() {
   return this.aggregate([{$group: { _id: "$cuisine"}}]);
};


module.exports = mongoose.model('Restaurant', RestaurantsSchema);

