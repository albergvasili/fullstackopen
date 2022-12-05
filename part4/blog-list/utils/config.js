require('dotenv').config();

const PORT = process.env.PORT;

const mongoURL= process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URL
  : process.env.MONGO_URL;

module.exports = {
  mongoURL,
  PORT
};
