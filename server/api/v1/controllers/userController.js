import bcrypt from 'bcrypt';

import users from '../db/users';
import jwt from '../middleware/jwt';
import statusValidator from '../helpers/verifyStatus';
import db from '../db/index';

class UserController {
  static async userSignUp(req, res) {
    let text = `SELECT * FROM users
      WHERE email = $1`;
    let values = [
      req.body.email,
    ];
    const { rows } = await db.query(text, values);
    if (rows[0]) {
      return res.status(409).json({
        status: 409,
        error: 'User with the email already exists',
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 8);
    values = [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      hashPassword,
      req.body.address,
      'unverified',
      false,
      new Date(),
    ];
    text = `INSERT INTO
          users(email, firstName, lastName, password, address, status, isAdmin, createdOn)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8)
          returning *`;
    const queryUserTable = await db.query(text, values);
    const { password, ...createdUser } = queryUserTable.rows[0];
    const token = await jwt.createToken(createdUser);
    return res.status(201).json({
      status: 201,
      data: { token, ...createdUser },
    });
  }

  static async userLogin(req, res) {
    const text = `SELECT * FROM users
      WHERE email = $1`;
    const returnedUser = await db.query(text, [req.body.email]);
    if (!returnedUser.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    } else {
      bcrypt.compare(req.body.password, returnedUser.rows[0].password, (err, match) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: 'An error occured during log in',
          });
        }
        if (!match) {
          return res.status(401).json({ status: 401, error: 'Auth failed' });
        }
        const token = jwt.createToken(returnedUser.rows[0]);
        const { password, ...user } = returnedUser.rows[0];
        return res.status(200).json({
          status: 200,
          data: { token, ...user },
        });
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
