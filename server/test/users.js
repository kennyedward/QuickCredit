import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/v1';

chai.use(chaiHttp);

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
