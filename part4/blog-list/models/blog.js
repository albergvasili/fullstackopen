const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  authors: String,
  url: String,
  likes: Number
});

module.exports = mongoose.model('Blog', blogSchema);
