const handlebars = require('handlebars')
// Are there any errors
const isErrors = (errors) => {
    return errors.length > 0
};
// Is there a specific error
const isError = (errors, field) => {
    return errors.filter(error => error.field == field).length == 1
};
// Get an error description
const get = (errors, field) => {
    return errors.filter(error => error.field == field)[0].description
};



module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    console.log('Requested index page')
    const viewContext = {}

    viewContext.pageTitle = 'Example Page'

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

    handlebars.registerHelper("isError", function(errors, field, options) {
        if(isError(errors, field)) {
          return options.fn(this);
        } else {
          return options.inverse(this)
        }
    });

    handlebars.registerHelper("get", function(errors, field) {
      return get(errors, field)
    });

   const viewContext = {
     'data': request.payload,
     'errors': errors,
     'isErrors': function () {
         return isErrors
     }
   }

    if(errors.length) {
       reply.view('form', viewContext)
    } else {
       // MAKE THIS GO TO /VIEW
       reply.redirect('/')
    }

  }
}
]