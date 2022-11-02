require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Entry = require('./models/entry');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

app.use(morgan(':method :url :status - :response-time ms - :data'));

morgan.token('data', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return 'No data';
  }
});

let data = [
  {
    "id": 1,
    "name": "Alberg Vasili",
    "number": "123-12334"
  },
  {
    "id": 2,
    "name": "Luna Greenleaf",
    "number": "223-15334"
  },
  {
    "id": 3,
    "name": "Monsieur Monkey",
    "number": "223-35038"
  },
  {
    "id": 4,
    "name": "Akesi Jelo",
    "number": "423-25238"
  }
];

app.get('/api/persons', (req, res) => {
  Entry.find({})
    .then(result => {
      res.json(result);
    })
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = data.find(person => person.id === id);
  if (entry) {
    res.json(entry)
  } else {
    res.status(400).json({
      error: `No entries were found with the ID #${id}`
    });
  }
});

app.get('/info', (req, res) => {
  const now = new Date();
  const amount = data.length;
  res.send(`
    <p>Phonebook has info for ${amount} people</p>
    <p>${now}</p>
    `);
});

const generateID = () => {
  return Math.floor(Math.random() * 10000);
}

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    res.status(404).json({
      error: "Name or number cannot be empty"
    })
  } else if (data.find(person => person.name === body.name)) {
    res.status(404).json({
      error: `${body.name} already exists in the phonebook`
    })
  };

   const entry = new Entry({
     name: body.name,
     number: body.number
   });

   entry.save().then(savedEntry => {
     res.json(savedEntry);
   });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  data = data.filter(person => person.id !== id);

  res.status(204).end();
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

