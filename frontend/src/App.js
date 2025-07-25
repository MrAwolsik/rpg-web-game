import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCharacter from "./pages/CreateCharacter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateCharacter />} />
        {/* autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;