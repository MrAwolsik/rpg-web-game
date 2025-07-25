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