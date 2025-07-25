const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Routes REST
router.post('/', characterController.createCharacter);
router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;