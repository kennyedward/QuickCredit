import jwt from 'jsonwebtoken';

const createToken = (newUser, res) => {
  const payLoad = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    status: newUser.status,
    isAdmin: newUser.isAdmin,
  };
  jwt.sign(payLoad, 'bonjourmonamicavabienmerci', (err, token) => {
    if (err) {
      return res.json({
        status: 500,
        error: 'There was an error creating token.',
      });
    }
    return res.json({
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
