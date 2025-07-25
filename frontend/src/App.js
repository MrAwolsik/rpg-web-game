import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCharacter from "./pages/CreateCharacter";
import CharacterDetail from "./pages/CharacterDetail";
import CharacterList from "./pages/CharacterList";
import CharacterEdit from "./pages/CharacterEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/character/edit/:id" element={<CharacterEdit />} />
        {/* autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;