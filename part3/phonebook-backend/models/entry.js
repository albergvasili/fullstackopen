const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting to database');

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  })

const schema = new mongoose.Schema({
  name: String,
  number: Number
});


module.exports = mongoose.model('Entry', schema);
