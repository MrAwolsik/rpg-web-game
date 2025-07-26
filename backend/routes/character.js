const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Routes REST
router.post('/', characterController.createCharacter);
router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);
router.post('/:characterId/inventory', characterController.addItemToInventory);
// DELETE /api/characters/:characterId/inventory/:itemId
router.delete('/:characterId/inventory/:itemId', characterController.removeItemFromInventory);

module.exports = router;