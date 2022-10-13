import axios from 'axios';

const baseURL = '/api/persons';

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

const updateEntry = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson);
  return request.then(response => response.data);
};

const methods = { getAll, addNew, deleteEntry, updateEntry };

export default methods;
