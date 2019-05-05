import users from '../db/users';

const applyForLoan = (req, res) => {
  const user = users.find(person => person.id === req.authData.id);

  if (user) {
    if (user.status === 'unverified') {
      return res.status(400).json({
        status: 400,
        error: 'Your account is yet to be verified. Please hold on for verification.',
      });
    }
  }
};

export default {
  applyForLoan,
};
