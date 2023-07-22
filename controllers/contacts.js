const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers/');

// const Joi = require('joi');
// const schema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(30)
//     .required(),
  
//   email: Joi.string()
//     .email({ minDomainSegments: 2 })
//     .required(),
  
//   phone: Joi.number()
//     .positive()
//     .required()
// })
// >> --------------------------------------------------------------------------------------->
const getAll =  async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
}
// >> --------------------------------------------------------------------------------------->
const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
}

// >> --------------------------------------------------------------------------------------->
const postContact = async (req, res) => {
     const result = await contacts.addContact(req.body);
     
     res.status(201).json(result);  
}

// >> --------------------------------------------------------------------------------------->
const deleteOneContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    
    res.json({
      message: "Delete success "
    })
}

// >> --------------------------------------------------------------------------------------->
const changeContact =  async (req, res) => {
 
  // get dynamic parameters  
  const { contactId } = req.params;
  // update contacts  
  const result = await contacts.updateContact(contactId, req.body);
  // if there are no matches, I throw an error  
  if (!result) { 
    throw HttpError(404, "Not found");
  }
  // If the outcome is good, I return the updated contact to the frontend
  res.json(result);
}

module.exports = {
    // wrapping it in a wrapping function
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    postContact: ctrlWrapper(postContact),
    deleteOneContact: ctrlWrapper(deleteOneContact),
    changeContact: ctrlWrapper(changeContact)
}