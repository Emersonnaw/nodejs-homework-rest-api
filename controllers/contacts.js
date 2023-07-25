const {Contact} = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers/');


// >> --------------------------------------------------------------------------------------->
const getAll =  async (req, res) => {
    const result = await Contact.find();
    res.json(result);
}
// >> --------------------------------------------------------------------------------------->
const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
}

// // >> --------------------------------------------------------------------------------------->
const postContact = async (req, res) => {
    const result = await Contact.create(req.body);  
    res.status(201).json(result);  
}

// >> --------------------------------------------------------------------------------------->
const deleteOneContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    
    res.json({
      message: "Delete success "
    })
}

// >> --------------------------------------------------------------------------------------->
const changeContactById =  async (req, res) => {
 
  // get dynamic parameters  
  const { contactId } = req.params;
  // update contacts  
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  // if there are no matches, I throw an error  
  if (!result) { 
    throw HttpError(404, "Not found");
  }
  // If the outcome is good, I return the updated contact to the frontend
  res.json(result);
}

 // >> --------------------------------------------------------------------------------------->
const updateFavorite =  async (req, res) => {
 
  // get dynamic parameters  
  const { contactId } = req.params;
  // update contacts  
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
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
    changeContactById: ctrlWrapper(changeContactById),
    updateFavorite: ctrlWrapper(updateFavorite)
}