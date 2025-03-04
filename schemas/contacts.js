const Joi = require('joi');
const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  
  phone: Joi.number()
    .positive()
    .required()
})


module.exports = {
  schema,     
};