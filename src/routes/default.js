const helpers = require('../helpers/error_helpers.js')
const validation = require('../helpers/form_validation.js')
const Joi = require('joi')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    var errors = []

    const viewContext = {
      'pageTitle': 'Example Page',
      'errors': errors,
      'isErrors': function () {
        return helpers.isErrors(errors)
      }
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
          err.details.forEach(function (detail) {
            errors.push({description: detail.message, field: detail.path})
          })

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

          reply.view('registered', successViewContext)
        }
      })
    }
  }

}]
