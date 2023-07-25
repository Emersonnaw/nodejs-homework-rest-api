const express = require('express')
const router = express.Router();

const { getAll, getById, postContact, deleteOneContact, changeContactById, updateFavorite } = require('../../controllers/contacts');


const { isValidId, validateBody } = require('../../middlewares');

 const {schemas} = require('../../models/contact')

// >> --------------------------------------------------------------------------------------->

router.get('/',getAll)

// >> --------------------------------------------------------------------------------------->

router.get("/:contactId",isValidId, getById )

 // >> --------------------------------------------------------------------------------------->

router.post("/", validateBody(schemas.joiSchema), postContact)

 // >> --------------------------------------------------------------------------------------->

router.delete('/:contactId',isValidId, deleteOneContact )

 // >> --------------------------------------------------------------------------------------->

router.put('/:contactId', isValidId, validateBody(schemas.joiSchema), changeContactById)

 // >> --------------------------------------------------------------------------------------->
router.patch('/:contactId/favorite',isValidId, validateBody(schemas.favoriteShema), updateFavorite)


module.exports = router
