const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: String,
  class: String,
  level: Number,
  experience: Number,
  stats: {
    hp: Number,
    mana: Number,
    strength: Number,
    intelligence: Number,
    agility: Number,
    defense: Number,
  },
  equipment: {
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: "Weapon", default: null },
    armor: { type: mongoose.Schema.Types.ObjectId, ref: "Armor", default: null },
  },
  inventory: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      type: { type: String, enum: ["item", "weapon", "armor"], required: true },
      weight: { type: Number, required: true }, // poids individuel
    },
  ],
  hasBackpack: { type: Boolean, default: false }, // nouveau champ
}, { timestamps: true });

// 👇 Méthode virtuelle pour capacité max
characterSchema.methods.getInventoryCapacity = function () {
  const baseCapacity = this.stats.strength * 2; // ex : 2 unités par point de force
  return this.hasBackpack ? baseCapacity + 10 : baseCapacity;
};

module.exports = mongoose.model("Character", characterSchema);
