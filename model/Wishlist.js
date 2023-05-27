const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wishlistschema = new Schema({
  email: String,
  wishlistitem:{
    type:[String],
    default:[]
  }
});

module.exports = mongoose.model("Wishlist", Wishlistschema);