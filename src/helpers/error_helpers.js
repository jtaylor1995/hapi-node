const handlebars = require('handlebars')

// Are there any errors
const isErrors = (errors) => {
  return errors.length > 0
}
// Is there a specific error
const isError = (errors, field) => {
  return errors.filter(error => error.field == field).length == 1
}
// Get an error description
const get = (errors, field) => {
  return errors.filter(error => error.field == field)[0].description
}

const isErrorHelper = handlebars.registerHelper('isError', function (errors, field, options) {
  if (isError(errors, field)) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

const getHelper = handlebars.registerHelper('get', function (errors, field) {
  return get(errors, field)
})

module.exports = {
  isErrors: isErrors,
  isError: isError,
  get: get,
  isErrorHelper: isErrorHelper,
  getHelper: getHelper
}
