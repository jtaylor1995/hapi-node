const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')
const server = require('../index.js')

var request = require('supertest');


lab.experiment('Basic HTTP Tests', () => {
  lab.test('GET / (index endpoint test)', (done) => {
    var options = {
      method: 'GET',
      url: '/'
    }

    // Simulate an http request
    server.inject(options, (response) => {
      //  Expect http response status code to be 200 ('Ok')
      Code.expect(response.statusCode).to.equal(200)

      // Expect some content to be on the returned page
      Code.expect(response.result).to.contain('Submit Registration')

      server.stop(done)  // done() callback is required to end the test.
    })
  })
})


lab.experiment('Basic HTTP Supertest', () => {
  lab.test('GET / (index page test)', (done) => {
    request(server.listener)
      .get('/')
      .expect(200, done);
  })
})
