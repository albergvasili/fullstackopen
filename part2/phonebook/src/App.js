import { useState, useEffect } from 'react';
import axios from 'axios';

const Title = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
};

const Form = ({ submit, children, button }) => {
  return (
    <>
      <form onSubmit={submit}>
        {children}
        <Button text={button}/>
      </form>
    </>
  )
};

const PhonebookInputs = ({ name, number, numberChange, nameChange }) => {
  return (
    <>
      <Input label="Name:" value={name} onChange={nameChange} />
      <Input label="Number:" value={number} onChange={numberChange} />
    </>
  )
};
      

const Input = ({ label, value, onChange }) => {
  return (
        <div>
          <label>
            {label}
            <input value={value} onChange={onChange} />
          </label>
        </div>
  )
};

const Button = ({ text }) => {
  return (
        <div>
          <button type="submit">{text}</button>
        </div>
  )
};

const ContactList = ({ phoneList }) => {
  return (
    <>
      {phoneList.map(
        person => <p key={person.name}>{person.name} - {person.number}</p>
      )}
    </>
  )
};

const Phonebook = ({ filter, fullList, filteredList }) => {
  if (!filter) {
    return (
      <ContactList phoneList={filteredList} />
    )}
  return (
      <ContactList phoneList={fullList} />
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('Inital state:', response.data)
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
      : setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
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
      <Phonebook fullList={persons} filteredList={filteredList} />
    </div>
  )
};

export default App;
