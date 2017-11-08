const Hapi = require('hapi')
const winston = require('winston');

const server = new Hapi.Server()

server.connection({
  port: 8000
})

server.register({ register: require('crumb'), options: {}}, function (err) {
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

//Create a basic logger
winston.loggers.add('logger', {
  console: {
    level: 'debug',
    colorize: 'true',
    label: 'category one'
  },
  file: {
    filename: 'test-log-file.log',
    level: 'warn'
  }
});

module.exports = server
