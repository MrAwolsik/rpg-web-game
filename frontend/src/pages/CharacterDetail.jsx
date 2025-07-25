import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
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

  if (error) return <Alert variant="danger">Erreur : {error}</Alert>;
  if (!character)
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Header as="h2">{character.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Classe :</strong> {character.class}
            <br />
            <strong>Niveau :</strong> {character.level}
            <br />
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
    </Container>
  );
}
