const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const RestaurantsSchema = new mongoose.Schema({
      address: {
         coord: [],
         street: { type : String, default : '', trim : true },
         zipcode: { type : String, default : '', trim : true },
      },
      comments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
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

RestaurantsSchema.statics.avgScore = function() {
   return this.aggregate([
                             { $unwind : "$grades"},
                             { $group : { restaurants_id  : '$name', average : { $avg : '$grades.score' } } }
                          ]);
};



module.exports = mongoose.model('Restaurant', RestaurantsSchema);
