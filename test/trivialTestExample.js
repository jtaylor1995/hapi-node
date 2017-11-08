var Chai = require('Chai')

describe('Trivial', function () {
  it('should perform trivial test', function (done) {
    Chai.expect(1 + 1).to.equal(2)

    // How to expect the length of some item
    Chai.expect('something').to.have.length(9)

    done()
  })
})
