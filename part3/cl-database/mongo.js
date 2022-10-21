const mongoose = require('mongoose');

const pass = process.argv[2];

const url = `mongodb+srv://phonebook:${pass}@cluster0.78jxnws.mongodb.net/?retryWrites=true&w=majority`

const schema = new mongoose.Schema({
  name: String,
  number: Number
});

const Entry = mongoose.model('Entry', schema);

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      Entry.find({}).then(res => {
        console.log('Phonebook:');
        res.forEach(entry => {
          console.log(entry.name, entry.number);
        })
      })
     mongoose.connection.close()
    });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');


      const entry = new Entry({
        name: process.argv[3],
        number: process.argv[4]
      });

      return entry.save();
    })
    .then(() => {
      console.log(
        `Added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
      return mongoose.connection.close()
    })
    .catch((error) => console.log(error))
};
