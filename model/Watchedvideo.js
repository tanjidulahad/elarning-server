const mongoose = require('mongoose');
const { Schema } = mongoose;

const Watchedvideoschema = new Schema({
  email: String,
  watchedvideos:{
    type:[String],
    default:[]
  }
});

module.exports = mongoose.model("Watchedvideo", Watchedvideoschema);