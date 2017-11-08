const Hapi = require('hapi')

const server = new Hapi.Server()

var crumbOptions = {
  restful: false, // false enables payload level validation of crumb, true uses X-CSRF-Token header
  addToViewContext: true, // automatically add to view contexts
  cookieOptions: {
    isSecure: false // Set to false when not using HTTPS
  }
}

server.connection({
  port: 8000
})

server.register({ register: require('crumb'), options: crumbOptions}, function (err) {
  if (err) {
    throw err
  }
})

server.register([require('inert'), require('vision')], (err) => {
  if (err) {
    throw err
  }
    // load views
  server.views(require('./src/views'))

    // load routes
  server.route(require('./src/routes/public'))
  server.route(require('./src/routes/default'))
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.info('Server running at:', server.info)
})

module.exports = server
