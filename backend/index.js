const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const characterRoutes = require('./routes/character');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err));

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser JSON

// Routes API
app.use('/api/characters', characterRoutes);

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en cours sur http://localhost:${PORT}`);
});
