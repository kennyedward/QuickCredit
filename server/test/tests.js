import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/v1';

chai.use(chaiHttp);
const should = chai.should();

let userToken = '';

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
