import bcrypt from 'bcrypt';

import users from '../db/users';
import idGenerator from '../helpers/randomIdGenerator';
import jwt from '../middleware/jwt';

const userSignUp = (req, res) => {
  const newUser = {
    id: Number(idGenerator()),
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    status: 'unverified',
    isAdmin: false,
    registered: new Date(),
  };

  const result = users.find(user => user.email === newUser.email);

  if (!result) {
    bcrypt.hash(newUser.password, 8, (err, hashPassword) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'An error occured during signup. Please try again.',
        });
      }
      newUser.password = hashPassword;
      users.push(newUser);
      const status = 201;
      return jwt.createToken(newUser, res, status);
    });
  } else {
    res.status(409).json({
      status: 409,
      error: 'User already exists',
    });
  }
};

const userLogin = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = users.find(registeredUser => registeredUser.email === user.email);

  if (!result) {
    res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  } else {
    bcrypt.compare(user.password, result.password, (err, match) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'An error occured during log in',
        });
      }
      const status = 200;
      return match ? jwt.createToken(result, res, status)
        : res.status(401).json({ status: 401, error: 'Auth failed' });
    });
  }
};

export default {
  userSignUp,
  userLogin,
};
