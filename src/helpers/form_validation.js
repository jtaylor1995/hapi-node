const Joi = require('joi')

const schema = {
  name: Joi.string().required().max(20).options({
    language: {
      any: {
        empty: '!!Please enter a name'
      },
      string: {
        max: '!!Name must be no longer than 20 characters'
      }
    }
  }),
  company: Joi.string().required().options({
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