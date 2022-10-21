const mongoose = require('mongoose');

const pass = process.argv[2];

const url = `mongodb+srv://phonebook:${pass}@cluster0.78jxnws.mongodb.net/?retryWrites=true&w=majority`

const schema = new mongoose.Schema({
  name: String,
  number: Number
});

const Entry = mongoose.model('Entry', schema);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected');

    const entry = new Entry({
      name: 'Test',
      number: 42
    });

    return entry.save();
  })
  .then(() => {
    console.log('Entry saved');
    return mongoose.connection.close()
  })
  .catch((error) => console.log(error))
