import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const addNew = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then(response => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response => response.data);
};

const methods = { getAll, addNew, deleteEntry };

export default methods;
