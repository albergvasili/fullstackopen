const express = require('express');
const app = express();
app.use(express.json());

const data = [
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

app.get('/info', (req, res) => {
  const now = new Date();
  const amount = data.length;
  res.send(`
    <p>Phonebook has info for ${amount} people</p>
    <p>${now}</p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

