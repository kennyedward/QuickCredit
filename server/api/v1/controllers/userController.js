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
        return res.json({
          status: 400,
          error: 'An error occured during signup. Please try again.',
        });
      }
      newUser.password = hashPassword;
      users.push(newUser);
      return jwt.createToken(newUser, res);
    });
  } else {
    res.json({
      status: 409,
      error: 'User already exists',
    });
  }
};

export default {
  userSignUp,
};
