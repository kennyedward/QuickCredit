import bcrypt from 'bcrypt';

const userpassword = bcrypt.hashSync('kenny', 8);

const seedSecodData = `INSERT INTO
users(email, firstname, lastname, password, address, status, isadmin)
VALUES('kenny@gmail.com',
'kenny',
'roland',
'${userpassword}',
'No 1, Planet Earth, beside Mercury, Universe Galaxy.',
'unverified',
false);
`;

export default { seedSecodData };
