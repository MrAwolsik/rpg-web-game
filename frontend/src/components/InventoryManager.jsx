import { useState } from "react";
import { Button, ListGroup, Card, Alert } from "react-bootstrap";


export default function InventoryManager({ character, loot, onAddItem, onRemoveItem }) {
  const [error, setError] = useState("");

  const CAPACITY_FACTOR = 5;
  const BACKPACK_BONUS = 20;
  const hasBackpack = character.equipment?.backpack || false;

  const maxCapacity = character.stats.strength * CAPACITY_FACTOR + (hasBackpack ? BACKPACK_BONUS : 0);
  const currentLoad = character.inventory.length;
  const remainingCapacity = maxCapacity - currentLoad;

  function handleAccept(item) {
    if (remainingCapacity <= 0) {
      setError("Inventaire plein, impossible d'ajouter cet objet !");
      return;
    }
    setError("");
    onAddItem(item);
  }

  function handleRemove(invItemId) {
    setError("");
    onRemoveItem(invItemId);
  }

  return (
    <Card className="my-4">
      <Card.Header as="h5">
        Inventaire (Capacité : {currentLoad} / {maxCapacity})
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <ListGroup className="mb-3">
          {character.inventory.length === 0 && <ListGroup.Item>Inventaire vide</ListGroup.Item>}
          {character.inventory.map((invItem) => (
            <ListGroup.Item key={invItem._id} className="d-flex justify-content-between align-items-center">
              <div>{invItem.itemId.name}</div>
              <Button size="sm" variant="danger" onClick={() => handleRemove(invItem._id)}>
                Supprimer
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h6>Loot disponible</h6>
        <ListGroup>
          {loot.length === 0 && <ListGroup.Item>Pas de loot disponible</ListGroup.Item>}
          {loot.map((item) => (
            <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
              <div>{item.name}</div>
              <Button size="sm" variant="success" onClick={() => handleAccept(item)}>
                Accepter
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
