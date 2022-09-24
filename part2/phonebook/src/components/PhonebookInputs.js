/* PhonebookInputs and Input components */

import Input from './Input';

const PhonebookInputs = ({ name, number, numberChange, nameChange }) => {
  return (
    <>
      <Input label="Name:" value={name} onChange={nameChange} />
      <Input label="Number:" value={number} onChange={numberChange} />
    </>
  )
};

export default PhonebookInputs;
