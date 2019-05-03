import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (newUser, res) => {
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
    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        address: newUser.address,
        status: 'unverified',
        isAdmin: false,
        registered: new Date(),
      },
    });
  });
};

export default {
  createToken,
};
