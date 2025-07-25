// backend/routes/character.js
const express = require('express');
const router = express.Router();

// Exemple de personnage temporaire (plus tard tu liras en DB)
const exampleCharacter = {
  name: "Aeldor",
  level: 5,
  hp: 42,
  inventory: ["épée en fer", "potion de soin"]
};

// GET /api/character
router.get('/', (req, res) => {
  res.json(exampleCharacter);
});

module.exports = router;
