import bcrypt from 'bcrypt';
import jwt from '../middleware/jwt';
import statusValidator from '../helpers/verifyStatus';
import db from '../db/index';

class UserController {
  static async userSignUp(req, res) {
    const {
      email, firstName, lastName, address,
    } = req.body;
    let text = `SELECT * FROM users
      WHERE email = $1`;
    let values = [
      email,
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
      email,
      firstName,
      lastName,
      hashPassword,
      address,
      'unverified',
      false,
    ];
    text = `INSERT INTO
          users(email, firstname, lastname, password, address, status, isadmin)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          returning *`;
    const queryUserTable = await db.query(text, values);
    const createdUser = queryUserTable.rows[0];
    const token = await jwt.createToken(createdUser);
    delete createdUser.password;
    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: createdUser.id,
        email: createdUser.email,
        FirstName: createdUser.firstname,
        lastName: createdUser.lastname,
        address: createdUser.address,
        status: createdUser.status,
        isAdmin: createdUser.isadmin,
        createdOn: createdUser.createdon,
      },
    });
  }

  static async userLogin(req, res) {
    const text = `SELECT * FROM users
      WHERE email = $1`;
    const userQuery = await db.query(text, [req.body.email]);
    const returnedUser = userQuery.rows[0];
    if (!returnedUser) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    } else {
      bcrypt.compare(req.body.password, returnedUser.password, (err, match) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: 'An error occured during log in',
          });
        }
        if (!match) {
          return res.status(401).json({ status: 401, error: 'Incorrect login credentials' });
        }
        const token = jwt.createToken(returnedUser);
        delete returnedUser.password;
        return res.status(200).json({
          status: 200,
          data: { token, returnedUser },
        });
      });
    }
  }

  static async adminVerifyAccount(req, res) {
    const { userEmail } = req.params;
    const text = `SELECT * FROM users
      WHERE email = $1`;
    const userQuery = await db.query(text, [userEmail]);
    const returnedUser = userQuery.rows[0];
    if (!returnedUser) {
      return res.status(404).json({
        status: 404,
        error: 'User with the email address is not found.',
      });
    }
    if (returnedUser.status === 'verified') {
      return res.status(409).json({
        status: 409,
        error: 'User is already verified.',
      });
    }
    const verificationMessage = statusValidator.checkStatus(req.body.status);
    if (verificationMessage !== '') {
      return res.status(400).json({
        status: 400,
        error: verificationMessage,
      });
    }
    const updatedData = await db.query('UPDATE users SET status = $1 WHERE email = $2 returning *', [req.body.status, userEmail]);
    const userUpdate = updatedData.rows[0];
    const {
      email, firstname, lastname, password, address, status,
    } = userUpdate;
    return res.status(200).json({
      status: 200,
      data: {
        email,
        firstName: firstname,
        lastName: lastname,
        password,
        address,
        status,
      },
    });
  }
}

export default UserController;
