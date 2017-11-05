const helpers = require('../helpers/error_helpers.js')
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
  handler: function (request, reply) {

    var errors = []

    if(!request.payload.name)
      errors.push({description: 'Please provide your name', field: 'name'})

    if(!request.payload.company)
      errors.push({description: 'Please provide your company', field: 'company'})


   const errorViewContext = {
     'pageTitle': 'Example Page',
     'data': request.payload,
     'errors': errors,
     'isErrors': function () {
         return helpers.isErrors(errors)
       }
   }

   const successViewContext = {
    'pageTitle': 'Success',
    'data': request.payload
   }

    if(errors.length) {
       reply.view('form', errorViewContext)
    } else {
       // MAKE THIS GO TO /VIEW
       reply.view('registered', successViewContext)
    }

  }
}];
