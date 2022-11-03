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

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Entry.findById(id).then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(400).json(id);
    }
  })
  .catch(error => next(error))
});

app.get('/info', (req, res) => {
  const now = new Date();

  Entry.find({}).then(result => {
    const amount = result.length;
    res.send(`
      <p>Phonebook has info for ${amount} people</p>
      <p>${now}</p>
      `);
  })
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
   })
});

app.delete('/api/persons/:id', (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
      res.status(204).end()
      }
    })
    .catch((error) => next(error))
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }

  next(error)
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
