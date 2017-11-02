const get = (errors, field) => { return errors.filter(error => error.field == field )[0].description }
const isError = (errors, field) => { return errors.filter(error => error.field == field).length == 1}


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
  method: 'GET',
  path: '/site',
  handler: function (request, reply) {
    console.log('Requested site page')
    const viewContext = {}

    viewContext.pageTitle = 'Example Site Page'

    reply.view('site/site', viewContext)
  }
},
{
  method: 'POST',
  path: '/form',
  handler: function (request, reply) {
    var errors = []

    // MAKE THIS HAPI
       if(!request.payload.name)
            errors.push({description: 'Please provide your name', field: 'name'})

       if(!request.payload.company)
            errors.push({description: 'Please provide your company', field: 'company'})

             if(errors.length) {
                    reply.view('form', {
                    'data': request.payload,
                    'areErrors': errors.length > 0,
                    'nameError': isError(errors, 'name'),
                    'nameDesc': get(errors, 'name'),
                    'companyError': isError(errors, 'company'),
                    'companyDesc': get(errors, 'company'),
                    'errors': errors})
                } else {
                    res.redirect('/site')
                }

  }
}
]
