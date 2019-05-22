import bcrypt from 'bcrypt';

const adminpassword = bcrypt.hashSync('learn', 8);
const userpassword = bcrypt.hashSync('kenny', 8);

const createTableSeedData = `DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
id serial PRIMARY KEY,
email VARCHAR (500) UNIQUE NOT NULL,
firstname VARCHAR (500) NOT NULL,
lastname VARCHAR (500) NOT NULL,
password VARCHAR (500) NOT NULL,
address TEXT NOT NULL,
status VARCHAR (100) NOT NULL,
isadmin BOOLEAN NOT NULL,
createdon TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO
users(email, firstname, lastname, password, address, status, isadmin)
VALUES('admin@quickcredit.com',
'admin',
'admin',
'${adminpassword}',
'No 1, Quick Credit, Head Quarters, Boston USA.',
'verified',
true);
`;

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

export default { createTableSeedData, seedSecodData };
