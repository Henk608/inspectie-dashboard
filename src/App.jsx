import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MaakLijst from './pages/MaakLijst';
import InspectieInvullen from './pages/InspectieInvullen';
import AdminPanel from './pages/AdminPanel';

// in <Routes>:



function App() {
  return (
    <div>
      <nav>
        <Link to="/">Overzicht</Link> | <Link to="/maak">Maak nieuwe lijst</Link> | <Link to="/admin">Admin Panel</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maak" element={<MaakLijst />} />
        <Route path="/inspectie/:index" element={<InspectieInvullen />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
