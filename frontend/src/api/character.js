const API_URL = "http://localhost:3001/api/characters";

export async function createCharacter(characterData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(characterData),
  });

  if (!response.ok) {
    throw new Error("Échec de la création du personnage");
  }

  return await response.json();
}

export async function getCharacterById(id) {
  const response = await fetch(`http://localhost:3001/api/characters/${id}`);
  if (!response.ok) {
    throw new Error("Impossible de récupérer le personnage");
  }
  return await response.json();
}

export async function getAllCharacters() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des personnages");
  return res.json();
}

export async function deleteCharacter(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
  return res.json();
}

export async function updateCharacter(id, characterData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(characterData),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
}
