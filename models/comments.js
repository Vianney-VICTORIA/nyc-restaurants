const mongoose = require('mongoose');


const CommentsSchema = new mongoose.Schema({
  author: { type : String, default : '', trim : true },
  body:   { type : String, default : '', trim : true },
  createdDate: { type: Date, default: Date.now },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

module.exports = mongoose.model('Comments', CommentsSchema);
