import bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    email: 'admin@quickcredit.com',
    password: bcrypt.hashSync(process.env.ADMIN_PASS || 'learn', 8),
    isAdmin: true,
  },
  {
    id: 2,
    firstName: 'kenny',
    lastName: 'roland',
    email: 'kenny@gmail.com',
    password: bcrypt.hashSync(process.env.ADMIN_PASS || 'kenny', 8),
    isAdmin: false,
    status: 'unverified',
  },
];

export default users;
