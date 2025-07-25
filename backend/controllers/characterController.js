require('../models/Item');
require('../models/Weapon');
require('../models/Armor');

const Character = require('../models/Character');

// 🟢 Créer un personnage
exports.createCharacter = async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    console.log("🎯 Personnage créé dans MongoDB :", character); // Ajout
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔵 Obtenir tous les personnages
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find().populate('inventory.itemId equipment.weapon equipment.armor');
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟣 Obtenir un seul personnage
exports.getCharacterById = async (req, res) => {
  console.log("🔍 Requête GET pour personnage ID =", req.params.id); // 🔍 debug
  try {
    const character = await Character.findById(req.params.id).populate('inventory.itemId equipment.weapon equipment.armor');
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.status(200).json(character);
  } catch (err) {
    console.error("❌ Erreur getCharacterById :", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟠 Mettre à jour un personnage
exports.updateCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.status(200).json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔴 Supprimer un personnage
exports.deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.status(200).json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
