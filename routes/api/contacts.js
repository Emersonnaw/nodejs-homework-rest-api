const express = require('express')
const router = express.Router();

const { getAll, getById, postContact, deleteOneContact, changeContact } = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts')

// >> --------------------------------------------------------------------------------------->

router.get('/',getAll)

// >> --------------------------------------------------------------------------------------->

router.get('/:contactId', getById )

// >> --------------------------------------------------------------------------------------->

router.post('/', validateBody(schemas.schema), postContact)

// >> --------------------------------------------------------------------------------------->

router.delete('/:contactId', deleteOneContact )

// ----------------------------------------------------------->
router.put('/:contactId', validateBody(schemas.schema), changeContact)

module.exports = router
