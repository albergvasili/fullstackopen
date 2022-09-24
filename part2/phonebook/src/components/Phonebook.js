/* Phonebook and ContactList components */

const Phonebook = ({ filter, fullList, filteredList }) => {
  if (!filter) {
    return (
      <ContactList phoneList={filteredList} />
    )}
  return (
      <ContactList phoneList={fullList} />
  )
}

const ContactList = ({ phoneList }) => {
  return (
    <>
      {phoneList.map(
        person => <p key={person.name}>{person.name} - {person.number}</p>
      )}
    </>
  )
};

export default Phonebook;
