import { Routes, Route } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Figuras from "./pages/Figuras"
import Poleras from "./pages/Poleras"
import Contacto from "./pages/Contacto"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/figuras" element={<Figuras />} />
      <Route path="/poleras" element={<Poleras />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  )
}

export default App