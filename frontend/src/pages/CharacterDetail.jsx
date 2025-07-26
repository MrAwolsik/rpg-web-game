import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import { getCharacterById, updateCharacter, deleteInventoryItem } from "../api/character";
import InventoryManager from "../components/InventoryManager";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const [loot, setLoot] = useState([]); // loot après combat ou autre

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
        // Exemple : setLoot avec des objets à looter
        setLoot([
          { _id: "abc123", name: "Épée en bois" },
          { _id: "def456", name: "Armure de cuir" },
        ]);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCharacter();
  }, [id]);

  async function handleAddItem(item) {
    try {
      if (!character) return;
      const newInventory = [...character.inventory, { itemId: item._id }];
      const updatedCharacter = { ...character, inventory: newInventory };
      const saved = await updateCharacter(character._id, updatedCharacter);
      setCharacter(saved);
      setLoot(loot.filter(l => l._id !== item._id)); // retire de loot
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemoveItem(invItemId) {
    try {
      if (!character) return;
      // Appelle ta route DELETE pour enlever l’item côté backend
      await fetch(`http://localhost:3001/api/characters/${character._id}/inventory/${invItemId}`, { method: "DELETE" });

      const newInventory = character.inventory.filter(i => i._id !== invItemId);
      setCharacter({ ...character, inventory: newInventory });
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <Alert variant="danger">Erreur : {error}</Alert>;
  if (!character) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Header as="h2">{character.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Classe :</strong> {character.class}<br />
            <strong>Niveau :</strong> {character.level}<br />
            <strong>XP :</strong> {character.experience}
          </Card.Text>

          <h5>Statistiques</h5>
          <ListGroup variant="flush">
            <ListGroup.Item>PV : {character.stats.hp}</ListGroup.Item>
            <ListGroup.Item>Mana : {character.stats.mana}</ListGroup.Item>
            <ListGroup.Item>Force : {character.stats.strength}</ListGroup.Item>
            <ListGroup.Item>Intelligence : {character.stats.intelligence}</ListGroup.Item>
            <ListGroup.Item>Agilité : {character.stats.agility}</ListGroup.Item>
            <ListGroup.Item>Défense : {character.stats.defense}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Gestionnaire d'inventaire et loot */}
      <InventoryManager
        character={character}
        loot={loot}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
      />
    </Container>
  );
}
