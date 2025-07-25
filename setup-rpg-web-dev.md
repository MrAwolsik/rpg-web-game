
# ⚔️ Mise en place de l'environnement de développement pour un RPG Web (WSL + React + Node + MongoDB)

## 🧱 Objectif
Créer un environnement local pour développer un RPG web avec :
- 🎨 Frontend : React
- ⚙️ Backend : Node.js + Express
- 🧩 Base de données : MongoDB via Docker
- 🐧 Linux : Ubuntu via WSL2

---

## 🐧 Étape 1 — Mise à jour de WSL

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 🟩 Étape 2 — Installer Node.js et npm via NVM

```bash
# Installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Recharger le shell
source ~/.bashrc

# Installer Node.js LTS
nvm install 20
nvm use 20
nvm alias default 20

# Vérification
node -v
npm -v
```

---

## 🐳 Étape 3 — Installer Docker + MongoDB

### ✅ 1. Installer Docker Desktop (via https://www.docker.com/products/docker-desktop)

- Activer WSL2
- Lancer Docker Desktop et vérifier que ta distro WSL (Ubuntu) est activée

### ✅ 2. Vérifier Docker dans WSL

```bash
docker --version
docker run hello-world
```

### ✅ 3. Lancer MongoDB en conteneur

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo
```

---

## 🖥️ Étape 4 — Créer le backend Express

```bash
mkdir rpg-web-game && cd rpg-web-game
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors
```

### `index.js`

```js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const characterRoute = require('./routes/character');
app.use('/api/character', characterRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
```

### `routes/character.js`

```js
const express = require('express');
const router = express.Router();

const exampleCharacter = {
  name: "Aeldor",
  level: 5,
  hp: 42,
  inventory: ["épée en fer", "potion de soin"]
};

router.get('/', (req, res) => {
  res.json(exampleCharacter);
});

module.exports = router;
```

---

## 🟦 Étape 5 — Créer le frontend React

```bash
cd ..
npx create-react-app frontend
cd frontend
npm start
```

---

## 🔗 Étape 6 — Connecter le frontend au backend

### Dans `frontend/src/App.js`

```js
import { useEffect, useState } from 'react';

function App() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/character')
      .then(res => res.json())
      .then(data => setCharacter(data))
      .catch(err => console.error("Erreur d'appel API :", err));
  }, []);

  return (
    <div>
      <h1>Mon RPG Web</h1>
      {character ? (
        <div>
          <p>Nom : {character.name}</p>
          <p>Niveau : {character.level}</p>
          <p>Points de vie : {character.hp}</p>
          <p>Inventaire :</p>
          <ul>
            {character.inventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement du personnage...</p>
      )}
    </div>
  );
}

export default App;
```

---

## ✅ Étape 7 — Lancer le projet

### 1. Lancer le backend :

```bash
cd backend
node index.js
```

### 2. Lancer le frontend :

```bash
cd ../frontend
npm start
```

### 💡 Résultat :
Le navigateur affiche la fiche de personnage récupérée depuis l'API backend.

---

## 🗂️ Structure du projet

```
rpg-web-game/
├── backend/
│   ├── index.js
│   ├── routes/
│   │   └── character.js
├── frontend/
│   ├── src/
│   │   └── App.js
```

---

