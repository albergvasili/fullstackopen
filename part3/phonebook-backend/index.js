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

morgan.token('data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return 'No data';
  }
});

app.get('/api/persons', (req, res) => {
  Entry.find({})
    .then(result => {
      res.json(result);
    });
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
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  const now = new Date();

  Entry.find({})
    .then(result => {
      const amount = result.length;
      res.send(`
        <p>Phonebook has info for ${amount} people</p>
        <p>${now}</p>
        `);
    });
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  Entry.find({ name: body.name })
    .then(result => {
      if (result.length !== 0) {
        res.status(404).send('Duplicate data');
      } else {
        const entry = new Entry({
          name: body.name,
          number: body.number
        });

        entry.save()
          .then(savedEntry => {
            res.json(savedEntry);
          })
          .catch(error => next(error));
      }
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const entry = {
    number: body.number
  };

  Entry.findByIdAndUpdate(
    req.params.id,
    entry,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(returnedEntry =>
      res.json(returnedEntry)
    )
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end();
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send(error.message);
  } else if (error.name === 'ValidationError') {
    return res.status(400).send(error.message);
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
