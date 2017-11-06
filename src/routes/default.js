const helpers = require('../helpers/error_helpers.js')
const Joi = require('joi');

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {

    var errors = []
    console.log('Requested index page')

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

        const successViewContext = {
          'pageTitle': 'Success',
          'data': request.payload
        }

        reply.view('registered', successViewContext)

      },
      validate: {
          options: {
            abortEarly: false
          },
          payload: {
            name: Joi.string().required().error(new Error('Name cannot be empty')),
            company: Joi.string().required().error(new Error('Company cannot be empty'))
          },
          failAction: (request, reply, source, error) => {

            console.log("error " + error);
            console.log("data " + error.data);
            console.log("message " + error.output.payload.message);
            var errors = []

            errors.push({description: error.output.payload.message, field: 'name'})

            const errorViewContext = {
              'pageTitle': 'Example Page',
              'data': request.payload,
              'errors': errors,
              'isErrors': function () {
                return helpers.isErrors(errors)
              }
            }
            reply.view('form', errorViewContext)
          }
      }
  }

}];
