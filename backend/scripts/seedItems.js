import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../models/Item.js";

dotenv.config();

const items = [
  {
    name: "Potion de soin",
    type: "consumable",
    effect: "+50 PV",
  },
  {
    name: "Potion de mana",
    type: "consumable",
    effect: "+30 Mana",
  },
  {
    name: "Épée courte",
    type: "weapon",
    effect: "+10 Force",
  },
  {
    name: "Armure de cuir",
    type: "armor",
    effect: "+5 Défense",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany(); // Facultatif : vide la collection
    const created = await Item.insertMany(items);
    console.log("✅ Objets insérés :", created);
    process.exit();
  } catch (err) {
    console.error("❌ Erreur :", err);
    process.exit(1);
  }
}

seed();
