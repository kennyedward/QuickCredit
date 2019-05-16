import bcrypt from 'bcrypt';

import users from '../db/users';
import idGenerator from '../helpers/IdGenerator';
import jwt from '../middleware/jwt';
import statusValidator from '../helpers/verifyStatus';

class UserController {
  static userSignUp(req, res) {
    const newUser = {
      id: idGenerator(),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      address: req.body.address,
      status: 'unverified',
      isAdmin: false,
      createdOn: new Date(),
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
  }

  static userLogin(req, res) {
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
  }

  static adminVerifyAccount(req, res) {
    const { userEmail } = req.params;
    const user = users.find(account => account.email === userEmail);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User with the email address is not found.',
      });
    }
    const verificationMessage = statusValidator.checkStatus(req.body.status);
    if (verificationMessage !== '') {
      return res.status(400).json({
        status: 400,
        error: verificationMessage,
      });
    }
    user.status = req.body.status;
    return res.status(200).json({
      status: 200,
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        address: user.address,
        status: user.status,
      },
    });
  }
}

export default UserController;
