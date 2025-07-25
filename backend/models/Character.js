const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  class: {
    type: String,
    enum: ['warrior', 'mage', 'rogue', 'archer'],
    default: 'warrior',
  },
  stats: {
    hp: { type: Number, default: 100 },
    mana: { type: Number, default: 50 },
    strength: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    agility: { type: Number, default: 10 },
    defense: { type: Number, default: 5 }
  },
  inventory: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 }
    }
  ],
  equipment: {
    weapon: { type: Schema.Types.ObjectId, ref: 'Item', default: null },
    armor: { type: Schema.Types.ObjectId, ref: 'Item', default: null }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Character', CharacterSchema);
