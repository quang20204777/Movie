const jwt = require('jsonwebtoken');
const { User } = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('token');
    const decoded = jwt.verify(token, 'tranthanhquang');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('token');
    const decoded = jwt.verify(token, 'tranthanhquang');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user || user.role !== 'superadmin') throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = { userAuth, adminAuth };
