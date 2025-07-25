import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllCharacters, deleteCharacter } from "../api/character";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    try {
      const data = await getAllCharacters();
      setCharacters(data);
    } catch {
      setError("Erreur lors du chargement des personnages");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Voulez-vous vraiment supprimer ce personnage ?")) {
      try {
        await deleteCharacter(id);
        setCharacters(characters.filter((c) => c._id !== id));
      } catch {
        setError("Erreur lors de la suppression");
      }
    }
  }

  if (error) return <p className="text-danger">{error}</p>;
  if (!characters.length) return <p>Chargement...</p>;

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Liste des personnages</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Classe</th>
            <th>Niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character._id}>
              <td>{character.name}</td>
              <td>{character.class}</td>
              <td>{character.level}</td>
              <td>
                <Link
                  to={`/character/${character._id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Voir
                </Link>
                <Link
                  to={`/character/edit/${character._id}`}
                  className="btn btn-success btn-sm me-2"
                >
                  Éditer
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(character._id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
