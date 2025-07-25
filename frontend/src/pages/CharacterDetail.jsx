import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../api/character";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCharacter();
  }, [id]);

  if (error) return <p>Erreur : {error}</p>;
  if (!character) return <p>Chargement...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
      <p><strong>Classe :</strong> {character.class}</p>
      <p><strong>Niveau :</strong> {character.level}</p>
      <p><strong>XP :</strong> {character.experience}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Statistiques</h2>
        <ul className="list-disc ml-6">
          <li>PV : {character.stats.hp}</li>
          <li>Mana : {character.stats.mana}</li>
          <li>Force : {character.stats.strength}</li>
          <li>Intelligence : {character.stats.intelligence}</li>
          <li>Agilité : {character.stats.agility}</li>
          <li>Défense : {character.stats.defense}</li>
        </ul>
      </div>
    </div>
  );
}
