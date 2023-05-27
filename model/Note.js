const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  email: String,
  videoid: Number,
  notes: [{
    content: String,
    time: String
  }]
});

module.exports = mongoose.model("Note", noteSchema);