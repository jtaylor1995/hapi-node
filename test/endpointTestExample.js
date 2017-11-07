const server = require('../index.js')
var request = require('supertest');
var Chai = require('Chai')


describe('Endpoint', function() {

  it('should return 200 status', function(done) {
    request(server.listener)
      .get('/')
      .expect(200)

    server.stop(done)
  });
});

describe('Endpoint inject', function() {

  it('should return 200 status without supertest', function(done) {

    var options = {
      method: 'GET',
      url: '/'
    }
    // Simulate an http request
    server.inject(options, (response) => {
      //  Expect http response status code to be 200 ('Ok')
      Chai.expect(response.statusCode).to.equal(200)
      // Expect some content to be on the returned page
      Chai.expect(response.result).to.contain('Submit Registration')

      server.stop(done)  // done() callback is required to end the test.
    })
  });
});
