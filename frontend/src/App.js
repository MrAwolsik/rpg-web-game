import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";
import CreateCharacter from "./pages/CreateCharacter";
import CharacterEdit from "./pages/CharacterEdit";

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">RPG Web Game</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Liste des personnages</Nav.Link>
              <Nav.Link as={Link} to="/create">Créer un personnage</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/create" element={<CreateCharacter />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/character/edit/:id" element={<CharacterEdit />} />
        </Routes>
      </Container>
    </Router>
  );
}
