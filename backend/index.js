// backend/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour lire du JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Ajout de la route
const characterRoute = require('./routes/character');
app.use('/api/character', characterRoute);

app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
