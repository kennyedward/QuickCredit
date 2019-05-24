import bcrypt from 'bcrypt';

const adminpassword = bcrypt.hashSync('learn', 8);

const setupDevDB = `DROP TABLE IF EXISTS repayments;
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS users;
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
   CREATE TABLE IF NOT EXISTS loans(
    id serial PRIMARY KEY,
    useremail VARCHAR (500) REFERENCES users(email) NOT NULL,
    status VARCHAR (100) NOT NULL,
    repaid BOOLEAN NOT NULL,
    tenure INTEGER NOT NULL CHECK (tenure > 0),
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    paymentinstallment NUMERIC NOT NULL,
    balance NUMERIC NOT NULL,
    interest NUMERIC NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT NOW()
   );
   CREATE TABLE IF NOT EXISTS repayments(
    id serial PRIMARY KEY,
    loanid INTEGER REFERENCES loans(id) NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    createdon TIMESTAMP NOT NULL DEFAULT NOW()
   );
INSERT INTO
users(email, firstname, lastname, password, address, status, isadmin)
VALUES('realadmin@quickcredit.com',
'QuickCredit',
'Admin',
'${adminpassword}',
'No 1, Quick Credit, Head Quarters, Boston USA.',
'admin',
true);
`;

export default { setupDevDB };
