import { useState } from "react";
import { createCharacter } from "../api/character";
import { useNavigate } from "react-router-dom";

export default function CreateCharacter() {
  const [name, setName] = useState("");
  const [charClass, setCharClass] = useState("warrior");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdCharacter = await createCharacter({
        name,
        class: charClass,
        stats: {
          hp: 100,
          mana: 50,
          strength: 10,
          intelligence: 10,
          agility: 10,
          defense: 5,
        }
      });
      console.log("✅ ID utilisé pour redirection :", createdCharacter._id);
      navigate(`/character/${createdCharacter._id}`);
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Créer un personnage</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={charClass}
          onChange={(e) => setCharClass(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="warrior">Guerrier</option>
          <option value="mage">Mage</option>
          <option value="rogue">Voleur</option>
          <option value="archer">Archer</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
