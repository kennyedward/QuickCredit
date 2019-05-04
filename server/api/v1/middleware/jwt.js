import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (newUser, res, status) => {
  const payLoad = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    status: newUser.status,
    isAdmin: newUser.isAdmin,
  };
  jwt.sign(payLoad, process.env.APP_TOKEN, (err, token) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: 'There was an error creating token.',
      });
    }
    return res.status(status).json({
      status,
      data: {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        address: newUser.address,
        status: newUser.status,
        isAdmin: newUser.isAdmin,
        registered: newUser.registered,
      },
    });
  });
};

export default {
  createToken,
};
