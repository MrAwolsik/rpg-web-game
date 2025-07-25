import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { getCharacterById, updateCharacter } from "../api/character";

export default function CharacterEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const data = await getCharacterById(id);
        setForm(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCharacter();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (form.stats && name in form.stats) {
      setForm({
        ...form,
        stats: { ...form.stats, [name]: Number(value) },
      });
    } else if (name === "level" || name === "experience") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateCharacter(id, form);
      navigate(`/character/${id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <Alert variant="danger">Erreur : {error}</Alert>;
  if (!form)
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card>
        <Card.Header as="h2">Modifier le personnage</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClass">
              <Form.Label>Classe</Form.Label>
              <Form.Select
                name="class"
                value={form.class}
                onChange={handleChange}
                required
              >
                <option value="warrior">Guerrier</option>
                <option value="mage">Mage</option>
                <option value="rogue">Voleur</option>
              </Form.Select>
            </Form.Group>

            <Row>
              {Object.entries(form.stats).map(([stat, val]) => (
                <Col xs={6} md={4} key={stat}>
                  <Form.Group className="mb-3" controlId={`form${stat}`}>
                    <Form.Label>{stat.charAt(0).toUpperCase() + stat.slice(1)}</Form.Label>
                    <Form.Control
                      type="number"
                      name={stat}
                      value={val}
                      min={0}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <Button variant="success" type="submit">
              Enregistrer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
