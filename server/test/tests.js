import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/v1';

chai.use(chaiHttp);
const should = chai.should();

let adminToken = '';
let userToken = '';
const invalidToken = 'd0NtBedEcE1vEdtH15T0kEn1s1NvAlId';

describe('API Test', () => {
  it('should return success if user navigate to localhost:7000/api/v1', (done) => {
    chai.request(server)
      .get('/api/v1')
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('You\'re welcome to index API Endpoint');
        done();
      });
  });
});

describe('SignUp Test', () => {
  it('should fail if email field is empty', (done) => {
    const user = {
      email: '',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Email is required');
        done();
      });
  });
  it('should fail if email field is invalid', (done) => {
    const user = {
      email: 'kennyedwardatgmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid email: example - user@domain.com');
        done();
      });
  });
  it('should fail if firstName field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: '',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is required');
        done();
      });
  });
  it('should fail if firstName field is invalid', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 1234,
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid first name');
        done();
      });
  });
  it('should fail if trimmed firstName field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: '   ',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is empty');
        done();
      });
  });
  it('should fail if firstName field is not alphabet', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kenny123',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name can only contain alphabets.');
        done();
      });
  });
  it('should fail if firstName is not between 3 and 20 characters', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'k',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name length should be between 3 and 20');
        done();
      });
  });
  it('should fail if lastName field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: '',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name is required');
        done();
      });
  });
  it('should fail if lastName field is invalid', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 1234,
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid last name');
        done();
      });
  });
  it('should fail if trimmed lastName field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: '    ',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name is empty');
        done();
      });
  });
  it('should fail if lastName field is not alphabet', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward123',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name can only contain alphabets.');
        done();
      });
  });
  it('should fail if lastName is not between 3 and 20 characters', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'e',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name length should be between 3 and 20');
        done();
      });
  });
  it('should fail if password field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'kehinde',
      password: '',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password is required');
        done();
      });
  });
  it('should fail if password does not match', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'kehinde',
      password: 'love',
      confirmPassword: 'lover',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password does not match');
        done();
      });
  });
  it('should fail if address field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address is required');
        done();
      });
  });
  it('should fail if address field is invalid', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 123,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid address');
        done();
      });
  });
  it('should fail if trimmed address field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: '   ',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address is empty');
        done();
      });
  });
  it('should fail if address field contains unsupported characters', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: '@No 1, Planet #Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address can only contain alphabets, numbers, comma and hyphen.');
        done();
      });
  });
  it('should return success if signup fields supplied are valid', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').eql(user.firstName);
        res.body.data.should.have.property('lastName').eql(user.lastName);
        res.body.data.should.have.property('email').eql(user.email);
        res.body.data.should.have.property('address').eql(user.address);
        res.body.data.should.have.property('status').eql('unverified');
        res.body.data.should.have.property('isAdmin').eql(false);
        done();
      });
  });
  it('should fail if user signup details already exists', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      firstName: 'kehinde',
      lastName: 'edward',
      password: 'love',
      confirmPassword: 'love',
      address: 'No 1, Planet Earth.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('User already exists');
        done();
      });
  });
});
describe('Login Test', () => {
  it('should fail if email field is empty', (done) => {
    const user = {
      email: '',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Email is required');
        done();
      });
  });
  it('should fail if email field is invalid', (done) => {
    const user = {
      email: 'kennyedwardatgmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid email: example - user@domain.com');
        done();
      });
  });
  it('should fail if password field is empty', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password is required');
        done();
      });
  });
  it('should fail if user is not found', (done) => {
    const user = {
      email: 'debby@gmail.com',
      password: 'debby',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('User not found');
        done();
      });
  });
  it('should return success if login fields supplied are valid', (done) => {
    const user = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').eql(res.body.data.firstName);
        res.body.data.should.have.property('lastName').eql(res.body.data.lastName);
        res.body.data.should.have.property('email').eql(res.body.data.email);
        res.body.data.should.have.property('address').eql(res.body.data.address);
        res.body.data.should.have.property('status').eql(res.body.data.status);
        res.body.data.should.have.property('isAdmin').eql(res.body.data.isAdmin);
        done();
      });
  });
});

describe('User account before verification attempts to apply for loan', () => {
  it('should fail if a LOGGED IN, TOKEN VALID BUT UNVERIFIED User attempts to Apply for loan', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: 5,
          amount: 5000.00,
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Your account is yet to be verified. Please hold on for verification.');
            done();
          });
      });
  });
});

describe('Admin Test', () => {
  it('admin should be able to verify user account if user is created', (done) => {
    const adminLoggin = {
      email: 'admin@quickcredit.com',
      password: process.env.ADMIN_PASS,
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(adminLoggin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('isAdmin');
        res.body.data.isAdmin.should.eql(true);
        chai.request(server)
          .patch('/api/v1/users/kennyedward99@gmail.com/verify')
          .set('authorization', `Bearer ${adminToken}`)
          .send({ status: 'verified' })
          .end((error, response) => {
            response.body.should.have.status(200);
            response.body.should.have.property('data');
            response.body.data.status.should.eql('verified');
          });
        done();
      });
  });
  it('should fail if admin attempt to verify a user account NOT created', (done) => {
    const adminLoggin = {
      email: 'admin@quickcredit.com',
      password: process.env.ADMIN_PASS,
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(adminLoggin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('isAdmin');
        res.body.data.isAdmin.should.eql(true);
        chai.request(server)
          .patch('/api/v1/users/olabode_prof@gmail.com/verify')
          .set('authorization', `Bearer ${adminToken}`)
          .send({ status: 'verified' })
          .end((error, response) => {
            response.body.should.have.status(404);
            response.body.should.have.property('error');
            response.body.error.should.eql('User with the email address is not found.');
          });
        done();
      });
  });
  it('should fail if a user without a valid token attempts to verify a user account', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .set('authorization', `Bearer ${invalidToken}`)
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.eql('Invalid token, You need to login or signup');
      });
    done();
  });
  it('should fail if a user without admin rights attempts to verify a user account', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.eql('You\'re forbidden to perform this action.');
      });
    done();
  });
  it('should fail if a user without a token attempts to verify a user account', (done) => {
    chai.request(server)
      .patch('/api/v1/users/kennyedward99@gmail.com/verify')
      .send({ status: 'verified' })
      .end((error, response) => {
        response.body.should.have.status(401);
        response.body.should.have.property('error');
        response.body.error.should.eql('Auth failed');
      });
    done();
  });
});
describe('Loan Test', () => {
  it('should fail if user is not logged in', (done) => {
    const loan = {
      tenor: 5,
      amount: 5000.00,
      purpose: 'Business',
      startDate: new Date(),
    };
    chai.request(server)
      .post('/api/v1/loans')
      .send(loan)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Auth failed');
        done();
      });
  });
  it('should fail if user token is invalid', (done) => {
    const loan = {
      tenor: 5,
      amount: 5000.00,
      purpose: 'Business',
      startDate: new Date(),
    };
    chai.request(server)
      .post('/api/v1/loans')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(loan)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid token, You need to login or signup');
        done();
      });
  });
  it('should create Loan if user is logged in, token is valid and status is VERIFIED', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: 8,
          amount: 50000.00,
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            done();
          });
      });
  });
  it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if TENOR IS EMPTY', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: '',
          amount: 50000.78,
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Loan tenor is required');
            done();
          });
      });
  });
  it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if TENOR IS NOT AN INTEGER', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: 8.8,
          amount: 50000.00,
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Loan tenor must be an integer');
            done();
          });
      });
  });
  it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if TENOR IS LESS THAN 1 OR GREATER THAN 12', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: '13',
          amount: '50000.00',
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Loan tenor must be between 1 and 12');
            done();
          });
      });
  });
  it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if AMOUNT IS INVALID', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: 3,
          amount: '@5577.977',
          purpose: 'Business',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Loan amount is required');
            done();
          });
      });
  });
  it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if PURPOSE IS EMPTY', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: 3,
          amount: '95577.97',
          purpose: '',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Loan purpose is required');
            done();
          });
      });
  });
  it('Given a user is logged in, token is valid and status is VERIFIED, it should NOT create Loan if PURPOSE IS INVALID', (done) => {
    const userLoggin = {
      email: 'kennyedward99@gmail.com',
      password: 'love',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(userLoggin)
      .end((error, response) => {
        userToken = response.body.data.token;
        const loan = {
          tenor: 3,
          amount: '95577.97',
          purpose: '#$@#Fraud',
          startDate: new Date(),
        };
        chai.request(server)
          .post('/api/v1/loans')
          .set('authorization', `Bearer ${userToken}`)
          .send(loan)
          .end((err, res) => {
            res.body.should.have.status(400);
            res.body.should.be.a('object');
            res.body.error.should.be.a('string');
            res.body.error.should.eql('Loan purpose can only contain alphabets');
            done();
          });
      });
  });
});
describe('Admin Create Loan Repayment Test', () => {
  it('should fail if token is not found', (done) => {
    const loanRepayment = {
      paidAmount: 5000.00,
    };
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Auth failed');
        done();
      });
  });
  it('should fail if admin token is invalid', (done) => {
    const loanRepayment = {
      paidAmount: 5000.00,
    };
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid token, You need to login or signup');
        done();
      });
  });
  it('should return forbidden if a user without admin rights attempts to create loan repayment', (done) => {
    const loanRepayment = {
      paidAmount: 5000.00,
    };
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(loanRepayment)
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.eql('You\'re forbidden to perform this action.');
      });
    done();
  });
  it('should fail if admin token is VALID and PAIDAMOUNT IS INVALID', (done) => {
    const loanRepayment = {
      paidAmount: 5000.00,
    };
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Paid amount is required');
        done();
      });
  });
  it('should should fail if admin TOKEN is VALID, and PAIDAMOUNT IS VALID and Loan status is PENDING OR REJECTED', (done) => {
    const loanRepayment = {
      paidAmount: 5000.00,
    };
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Your loan is yet to be approved.');
        done();
      });
  });
  it('should create Loan Repayment if admin TOKEN is valid, and PAIDAMOUNT IS VALID', (done) => {
    const loanRepayment = {
      paidAmount: 5000.00,
    };
    chai.request(server)
      .post('/api/v1/loans/:loanId/repayment')
      .set('authorization', `Bearer ${adminToken}`)
      .send(loanRepayment)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        done();
      });
  });
});
