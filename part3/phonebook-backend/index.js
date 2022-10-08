const express = require('express');
const app = express();
app.use(express.json());

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
  res.send(data);
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
  console.log(body);

  const entry = {
    id: generateID(),
    name: body.name,
    number: body.number
  }

  data = data.concat(entry);
  res.json(data);
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

