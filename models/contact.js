const { Schema, model } = require("mongoose");
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');
// create schema
const contactSchema = new Schema({ 
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
   
  }
})
// add middlewere to scheme for generate true error  status
contactSchema.post("save", handleMongooseError);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const favoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  joiSchema,
  favoriteShema,
};
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };