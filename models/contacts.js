const fs = require('fs/promises')
const path = require('path');
const uuid = require('uuid').v4;

const contactsPath = path.join("models", "contacts.json");

 // ------------------------------------------------------------------------>
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
     return JSON.parse(data);
}

// -------------------------------------------------------------------------> 
const getContactById = async (contactId) => {
   const data = await listContacts();
    const trueId = await data.find(({id}) => id === contactId);
    return trueId || null;
}

// ------------------------------------------------------------------------->
const addContact = async (body) => {
   const allContacts = await listContacts();
    const newContact = {
        id:uuid(),
        ...body,
    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
}
// -------------------------------------------------------------------------->

const removeContact = async (contactId) => {
  //get all contacts
  const data = await listContacts();

  // find the index of the deleted contact
  const index = await data.findIndex(item => item.id === contactId);

  // check for availability in the database. If nothing is found return null
  if (index === -1) {
        return null;
  }

  const [result] = data.splice(index, 1);

    // update data
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return result;
}

// ------------------------------------------------------------->
const updateContact = async (contactId, body) => {
  //get all contacts
  const allContacts = await listContacts();

  // filter all contacts for matching input id
  const index = allContacts.findIndex(item => item.id === contactId);

  // check for availability in the database. If nothing is found return null
  if (index === -1) {
    return null
  }

  // By the found index, overwrite the content with the input data
  allContacts[index] = { contactId, ...body };

  // update data
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2))

  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
