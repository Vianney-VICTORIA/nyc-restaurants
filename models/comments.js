const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({    
      content: [{
         author: { type : String, default : '', trim : true },
         text: { type : String, default : '', trim : true },
         date: { type : Date, default : Date.now },
      }],
      id_restaurant: { type : String, default : '', trim : true },
});

module.exports = mongoose.model('Comment', CommentsSchema);
