import { useState } from 'react';

const Title = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
};

const Form = (props) => {
  return (
    <>
      <form onSubmit={props.submit}>
        {props.children}
        <Button />
      </form>
    </>
  )
};

const PhonebookInputs = ({ name, number, changeHandler }) => {
  return (
    <>
      <Input label="Name:" value={name} change={changeHandler} />
      <Input label="Number:" value={number} change={changeHandler} />
    </>
  )
};
      

const Input = ({ label, value, change }) => {
  return (
        <div>
          <label>
            {label}
            <input value={value} onChange={change} />
          </label>
        </div>
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
    {name: 'Alberg Vasili'}
  ]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName
    };

    const double = persons.some(
      log => log.name.toLowerCase() === newName.toLowerCase()
    );

    double
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
    setNewName('');
  };


  const handleChange = (event) => {
    setNewName(event.target.value)
  };

  return (
    <div>
      <Title title="Phonebook" />
      <Form submit={handleSubmit}>
        <PhonebookInputs name={newName} changeHandler={handleChange}  />
      </Form>
      <Title title="Numbers" />
      <Phonebook phoneList={persons} />
    </div>
  )
};

export default App;
