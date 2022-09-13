import { useState } from 'react';

const Title = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
};

const Form = ({ submit, value, change }) => {
  return (
    <>
      <form onSubmit={submit}>
        <div>
          name: <input value={value} onChange={change} />
        </div>
        <Button />
      </form>
    </>
  )
};

const Button = () => {
  return (
        <div>
          <button type="submit">add</button>
        </div>
  )
};

const Phonebook = ({ phoneList }) => {
  return (
    <>
      {phoneList.map(
        person => <p key={person.name}>{person.name}</p>
      )}
    </>
  )
};

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Alberg Vasili' }
  ]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };
  const handleChange = (event) => {
    setNewName(event.target.value)
  };

  return (
    <div>
      <Title title="Phonebook" />
      <Form submit={handleSubmit} value={newName} change={handleChange} />
      <Title title="Numbers" />
      <Phonebook phoneList={persons} />
    </div>
  )
};

export default App;
