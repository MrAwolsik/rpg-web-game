import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { createCharacter } from "../api/character";

export default function CreateCharacter() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    class: "warrior",
    level: 1,
    experience: 0,
    stats: {
      hp: 100,
      mana: 50,
      strength: 10,
      intelligence: 10,
      agility: 10,
      defense: 5,
    },
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    if (name in form.stats) {
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
      const newChar = await createCharacter(form);
      navigate(`/character/${newChar._id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card>
        <Card.Header as="h2">Créer un personnage</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

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

            <Button variant="primary" type="submit">
              Créer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
