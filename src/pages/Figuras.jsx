import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCarrito } from "../context/CarritoContext"

function Figuras() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState("")
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  const { carrito, agregarAlCarrito, vaciarCarrito, total } = useCarrito()

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true)
        const resp = await fetch("/productos.json")
        if (!resp.ok) throw new Error("Error cargando productos")
        const data = await resp.json()
        setProductos(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const figuras = productos.filter(p => p.categoria === "figuras")
  const figurasFiltradas = figuras.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="app-container">

      <header className="banner">
        <div className="banner-content">
          <h1>AniméStore</h1>
          <p>TIENDA DE ARTÍCULOS DE ANIMÉ</p>
        </div>
      </header>

      <nav className="navegador">

        {/* Desktop */}
        <div className="d-none d-xl-block">
          <div className="list-group rounded-3">
            <Link className="list-group-item list-group-item-action" to="/">Inicio</Link>
            <Link className="list-group-item list-group-item-action active" to="/figuras">Figuras</Link>
            <Link className="list-group-item list-group-item-action" to="/poleras">Poleras</Link>
            <Link className="list-group-item list-group-item-action" to="/contacto">Contacto</Link>
            <a className="list-group-item list-group-item-action"
               href="https://www.geekz.cl"
               target="_blank"
               rel="noopener noreferrer">
              Sitio externo
            </a>
          </div>
        </div>

        {/* Tablet */}
        <div className="d-none d-md-block d-xl-none">
          <div className="bg-dark rounded-3 px-3 py-2">
            <ul className="nav justify-content-center">
              <li className="nav-item"><Link className="nav-link text-white" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link text-white fw-semibold" to="/figuras">Figuras</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/poleras">Poleras</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/contacto">Contacto</Link></li>
              <li className="nav-item">
                <a className="nav-link text-white"
                   href="https://www.geekz.cl"
                   target="_blank"
                   rel="noopener noreferrer">
                  Sitio externo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile */}
        <div className="d-md-none">
          <nav className="navbar navbar-dark bg-dark rounded-3 px-3">
            <span className="navbar-brand fw-semibold">AniméStore</span>
            <button className="navbar-toggler"
              onClick={() => setMenuAbierto(!menuAbierto)}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>

          {menuAbierto && (
            <div className="bg-dark rounded-3 mt-2 p-2">
              <ul className="navbar-nav">
                <li><Link className="nav-link text-white" to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
                <li><Link className="nav-link text-white" to="/figuras" onClick={() => setMenuAbierto(false)}>Figuras</Link></li>
                <li><Link className="nav-link text-white" to="/poleras" onClick={() => setMenuAbierto(false)}>Poleras</Link></li>
                <li><Link className="nav-link text-white" to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link></li>
                <li>
                  <a className="nav-link text-white"
                     href="https://www.geekz.cl"
                     target="_blank"
                     rel="noopener noreferrer">
                    Sitio externo
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

      </nav>

      <main className="seccion-main">
        <h2>Figuras</h2>

        <input
          className="form-control mb-3"
          placeholder="Buscar figuras..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {cargando && <div className="alert alert-secondary">Cargando...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-3">
          {figurasFiltradas.map(producto => (
            <div key={producto.id} className="col-md-4">
              <div className="card">
                <img src={producto.imagen}
                     className="card-img-top"
                     alt={producto.nombre} />
                <div className="card-body">
                  <h5>{producto.nombre}</h5>
                  <p>${producto.precio.toLocaleString("es-CL")}</p>
                  <button className="btn btn-dark"
                    onClick={() => agregarAlCarrito(producto)}>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-4">
          <h3>Carrito</h3>
          <ul className="list-group mb-2">
            {carrito.length === 0
              ? <li className="list-group-item">Tu carrito está vacío.</li>
              : carrito.map((item, i) =>
                <li key={i} className="list-group-item d-flex justify-content-between">
                  {item.nombre}
                  <span>${item.precio.toLocaleString("es-CL")}</span>
                </li>
              )
            }
          </ul>

          <div className="d-flex justify-content-between">
            <strong>Total: ${total.toLocaleString("es-CL")}</strong>
            <button className="btn btn-outline-dark btn-sm"
              onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="horario-footer">
          <p><strong>Horario</strong></p>
          <p>Lun a Vie: 10:00 - 19:00</p>
          <p>Sábados: 11:00 - 14:00</p>
        </div>
        <div className="derechos-footer">
          <p>AniméStore 2026 - Todos los derechos reservados</p>
        </div>
      </footer>

    </div>
  )
}

export default Figuras