const Joi = require('joi')

// '!!' used as an escape prefix to allow fully custom error messages from JOI
const schema = {
  name: Joi.string().trim().required().max(20).options({
    language: {
      any: {
        empty: '!!Please enter a name'
      },
      string: {
        max: '!!Name must be no longer than 20 characters'
      }
    }
  }),
  company: Joi.string().trim().required().options({
    language: {
      any: {
        empty: '!!Please enter a company'
      }
    }
  })
}

module.exports = {
  schema: schema
}
