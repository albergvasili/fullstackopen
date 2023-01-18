const User = require('../models/user');
const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null;
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      req.user = null;
      return res.status(401).json({ error: 'token missing or invalid' });
    } else {
      const userId = await User.findById(decodedToken.id);
      req.user = userId;
    }
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor
};
