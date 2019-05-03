import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/v1';

chai.use(chaiHttp);
const should = chai.should();

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
