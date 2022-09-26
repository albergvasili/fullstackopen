import { useState, useEffect } from 'react';
import Form from './components/Form';
import Input from './components/Input';
import PhonebookInputs from './components/PhonebookInputs';
import Phonebook from './components/Phonebook';
import Title from './components/Title';
import methods from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    methods
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
        console.log('Inital state:', initialPhonebook)
      })
  }, [])

  const filteredList = persons.filter(log =>
    log.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    const double = persons.some(
      log => log.name.toLowerCase() === newName.toLowerCase()
    );

    double
      ? alert(`${newName} is already added to phonebook`)
      : addToServer(newPerson);
    setNewName('');
    setNewNumber('');
  };

  const addToServer = (newPerson) => {
    methods
      .addNew(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
  };

  const deleteContact = (entry) => {
    const id = entry.target.value;
    if (window.confirm(`Delete ${entry.target.name}?`)) {
      methods
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  };

  const filterChange = (event) => {
    setFilter(event.target.value)
  };

  const nameChange = (event) => {
    setNewName(event.target.value)
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  };


  return (
    <div>
      <h1>Phonebook</h1>
        <Input label="Filter by:" value={filter} onChange={filterChange}/>
      <Title title="New Entry:" />
      <Form submit={handleSubmit} button='Add'>
        <PhonebookInputs name={newName} nameChange={nameChange}
                         number={newNumber} numberChange={numberChange} />
      </Form>
      <Title title="Contact List:" />
      <Phonebook fullList={persons}
        filteredList={filteredList}
        onClick={deleteContact} />
    </div>
  )
};

export default App;
