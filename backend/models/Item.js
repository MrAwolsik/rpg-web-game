const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },      // par ex: "consumable", "equipment", etc.
  description: { type: String },
  // ajoute ici les propriétés spécifiques à ton Item
});

module.exports = mongoose.model('Item', itemSchema);
