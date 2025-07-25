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
