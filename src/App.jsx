import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Importa aquí otros componentes necesarios como Cartas, Clanes, etc.
import WelcomeMessage from "./components/Welcomemessage"
import Cartas from './components/Cartas';
import Players from './components/Players';
import Guardados from './components/Guardados';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/carta" element={<Cartas />} />
        <Route path="/jugadores" element={<Players />} />
        <Route path="/guardados" element={<Guardados />} />
        <Route path="/" element={<WelcomeMessage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
