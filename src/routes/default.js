const helpers = require('../helpers/error_helpers.js')
const validation = require('../helpers/form_validation.js')
const Joi = require('joi')
const server = require('../../index.js')
const xss = require('xss')
const winston = require('winston')
const logger = winston.loggers.get('logger')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    logger.silly('Requesting index')
    var errors = []

    const viewContext = {
      'pageTitle': 'Example Page',
      'errors': errors,
      'isErrors': function () {
        return helpers.isErrors(errors)
      },
      // Adds a crumb token to prevent CSRF
      'crumb': server.plugins.crumb.generate(request, reply)
    }
    reply.view('form', viewContext)
  }
},
{
  method: 'POST',
  path: '/form',
  config: {
    handler: function (request, reply) {
      var errors = []
      Joi.validate({name: request.payload.name, company: request.payload.company}, validation.schema, {abortEarly: false}, function (err, value) {
        if (err) {
          logger.debug('Error in form')
          err.details.forEach(function (detail) {
            errors.push({description: detail.message, field: detail.path})
          })

          // Protect against XSS
          request.payload.name = xss(request.payload.name)
          request.payload.company = xss(request.payload.company)
          const errorViewContext = {
            'pageTitle': 'Example Page',
            'data': request.payload,
            'errors': errors,
            'isErrors': function () {
              return helpers.isErrors(errors)
            }
          }
          reply.view('form', errorViewContext)
        } else {
          const successViewContext = {
            'pageTitle': 'Success',
            'data': request.payload
          }
          logger.info('User registered')
          reply.view('registered', successViewContext)
        }
      })
    }
  }
}]
