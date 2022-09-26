/* Phonebook and ContactList components */

const Phonebook = ({ filter, fullList, filteredList, onClick }) => {
  if (!filter) {
    return (
      <ContactList phoneList={filteredList} onClick={onClick}/>
    )}
  return (
      <ContactList phoneList={fullList} onClick={onClick}/>
  )
}

const ContactList = ({ phoneList, onClick }) => {
  return (
    <>
      {phoneList.map(
        person => <Entries key={person.id} 
                    person={person}
                    onClick={onClick}/>
      )}
    </>
  )
};

const Entries = ({ person, onClick }) => {
  return (
  <>
    <p key={person.name}>
      {person.name} - {person.number}
      <button type="submit" value={person.id}  onClick={onClick}>
        Delete
      </button>
    </p>
  </>
  )
};

export default Phonebook;
