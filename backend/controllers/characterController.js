const Character = require("../models/Character");
const Item = require("../models/Item");
const Weapon = require("../models/Weapon");
const Armor = require("../models/Armor");

// 🟢 Créer un personnage
exports.createCharacter = async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
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

// 📦 Ajouter un objet à l'inventaire
exports.addItemToInventory = async (req, res) => {
  try {
    const { characterId } = req.params;
    const { itemId, type, weight } = req.body;

    const character = await Character.findById(characterId);
    if (!character) return res.status(404).json({ error: "Personnage introuvable" });

    const currentWeight = character.inventory.reduce((sum, item) => sum + item.weight, 0);
    const capacity = character.getInventoryCapacity();

    if (currentWeight + weight > capacity) {
      return res.status(400).json({ error: "Inventaire plein" });
    }

    character.inventory.push({ itemId, type, weight });
    await character.save();

    res.status(200).json(character);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Supprimer un objet de l'inventaire
exports.removeItemFromInventory = async (req, res) => {
  try {
    const { characterId, itemId } = req.params;

    const character = await Character.findById(characterId);
    if (!character) return res.status(404).json({ error: "Personnage introuvable" });

    // Filtrer l'inventaire en retirant l'objet ciblé (itemId correspond à l'ObjectId de l'objet dans l'inventaire)
    character.inventory = character.inventory.filter(
      (item) => item._id.toString() !== itemId
    );

    await character.save();
    res.status(200).json(character);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
