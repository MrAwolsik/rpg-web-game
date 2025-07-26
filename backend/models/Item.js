import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["consumable", "weapon", "armor"], required: true },
  effect: { type: String },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;