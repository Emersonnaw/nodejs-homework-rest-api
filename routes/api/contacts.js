const express = require('express')
const Joi = require('joi');

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const router = express.Router();

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

// ----------------------------------------------------------->
router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

// ----------------------------------------------------------->
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
  
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})

// ----------------------------------------------------------->
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = await schema.validate(data);
 
    if (error) {
      throw HttpError(400, "missing required name field");
    }
     const result = await contacts.addContact(data);
     
     res.status(201).json(result);
    
  } catch (error) {
    next(error);
  }
})

// ----------------------------------------------------------->
router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
  
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    
    res.json({
      message: "Delete success "
    })

  } catch (error) {
    next(error);
  }
})

// ----------------------------------------------------------->
router.put('/:contactId', async (req, res, next) => {
  try {
  
  // Getting input data in JSON format
  const data = req.body;
  
  // validate the input  
  const { error } = await schema.validate(data);
  
  // If there is an error, I throw it out.
  if (error) {
    throw HttpError(400,"missing fields");
    }   

  // get dynamic parameters  
  const { contactId } = req.params;

  // update contacts  
  const result = await contacts.updateContact(contactId, data);

  // if there are no matches, I throw an error  
  if (!result) { 
    throw HttpError(404, "Not found");
  }
  
  // If the outcome is good, I return the updated contact to the frontend
  res.json(result);
   
} catch (error) {
  next(error);
  }
})

module.exports = router
