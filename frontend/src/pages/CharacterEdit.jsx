import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById, updateCharacter } from "../api/character";

export default function CharacterEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch {
        setError("Impossible de charger le personnage");
      } finally {
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateCharacter(id, character);
      navigate(`/character/${id}`);
    } catch {
      setError("Erreur lors de la sauvegarde");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!character) return null;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Éditer le personnage</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>
          Nom :{" "}
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label>
          Classe :{" "}
          <input
            type="text"
            name="class"
            value={character.class}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label>
          Niveau :{" "}
          <input
            type="number"
            name="level"
            value={character.level}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
