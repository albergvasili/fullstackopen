import { useState, useEffect } from 'react';
import Form from './components/Form';
import Input from './components/Input';
import PhonebookInputs from './components/PhonebookInputs';
import Phonebook from './components/Phonebook';
import Title from './components/Title';
import methods from './services/persons';

const Notification = ({ message }) => {
  let messageStyle = {
    marginBottom: 15,
    border: 'solid green',
    color: 'green',
    paddingLeft: 5
  };

  if (message) {
    if (!message.green) {
      messageStyle.border = 'solid red';
      messageStyle.color = 'red';
    }
    return (
      <div className='Notification' style={messageStyle}>
        <p>
          {message.text}
        </p>
      </div>
    )
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState('');

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

    const doubleCheck = persons.some(
      log => log.name.toLowerCase() === newName.toLowerCase()
    );

    const doubleContact = persons.filter(person => person.name === newName);

    doubleCheck
      ? updateContact(doubleContact[0].id, newPerson)
      : addToServer(newPerson);
    setNewName('');
    setNewNumber('');
  };

  const addToServer = (newPerson) => {
    methods
      .addNew(newPerson)
      .then(returnedPerson => {
        setNotification({
          green: true,
          text: `Added ${newPerson.name}`
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000);
        setPersons(persons.concat(returnedPerson))
      })
  };

  const updateContact = (id, newPerson) => {
      methods
        .updateEntry(id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(
            person => person.id !== id ? person : returnedPerson
          ))
        })
        .catch(error => {
          setNotification({
            green: false,
            text: `Information of ${newPerson.name} has already `
                  + `been removed from server`});
        })
  };

  const deleteContact = (entry) => {
    const id = Number(entry.target.value);
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
      <Notification message={notification} />
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
