import { Link } from "react-router-dom"
import { useState } from "react"

function Contacto() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <div className="app-container">
      {/* Header */}
      <header className="banner">
        <div className="banner-content">
          <h1>AniméStore</h1>
          <p>TIENDA DE ARTÍCULOS DE ANIMÉ</p>
        </div>
      </header>

      {/* Navegación */}
      <nav className="navegador">
        {/* Desktop */}
        <div className="d-none d-xl-block">
          <div className="list-group rounded-3">
            <Link className="list-group-item list-group-item-action" to="/">Inicio</Link>
            <Link className="list-group-item list-group-item-action" to="/figuras">Figuras</Link>
            <Link className="list-group-item list-group-item-action" to="/poleras">Poleras</Link>
            <Link className="list-group-item list-group-item-action active" to="/contacto">Contacto</Link>
            <a
              className="list-group-item list-group-item-action"
              href="https://www.geekz.cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sitio externo
            </a>
          </div>
        </div>

        {/* iPad */}
        <div className="d-none d-md-block d-xl-none">
          <div className="bg-dark rounded-3 px-3 py-2">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/figuras">Figuras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/poleras">Poleras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-semibold" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  href="https://www.geekz.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitio externo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* iPhone */}
        <div className="d-md-none">
          <nav className="navbar navbar-dark bg-dark rounded-3 px-3">
            <span className="navbar-brand fw-semibold">AniméStore</span>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>

          {menuAbierto && (
            <div className="bg-dark rounded-3 mt-2 p-2">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/" onClick={() => setMenuAbierto(false)}>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/figuras" onClick={() => setMenuAbierto(false)}>
                    Figuras
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/poleras" onClick={() => setMenuAbierto(false)}>
                    Poleras
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/contacto" onClick={() => setMenuAbierto(false)}>
                    Contacto
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="https://www.geekz.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Sitio externo
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Formulario (Hijo directo del app-container para que funcione el Grid) */}
      <section className="contacto-formulario">
        <div className="main-bienvenida mb-4">
          <h2>Contáctanos</h2>
          <p>Déjanos tus datos y te responderemos lo antes posible.</p>
        </div>
        <h3 className="separacion-titulo">Escríbenos</h3>
        <form className="formulario-contenedor">
          <div className="campo">
            <label>Nombre</label>
            <input type="text" placeholder="Tu nombre.." />
          </div>
          <div className="campo">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="Tu correo.." />
          </div>
          <div className="campo">
            <label>Mensaje</label>
            <textarea rows="5" className="form-control" placeholder="Escribe algo.."></textarea>
          </div>
          <button className="boton-enviar mt-3" type="button">Enviar Mensaje</button>
        </form>
      </section>

      {/* Info Extra (Hijo directo del app-container) */}
      <section className="contacto-info-extra">
        <h3 className="separacion-titulo">Quiénes Somos</h3>
        <p>
          Somos apasionados del mundo del animé y los coleccionables. En AniméStore nos dedicamos
          a traer las mejores figuras, poleras y pósters de tus series favoritas. Trabajamos día
          a día para asegurar que cada pieza de nuestra tienda cumpla con los más altos estándares
          de calidad para tu colección personal.
        </p>

        <h3 className="separacion-titulo">Dirección</h3>
        <p>Av. Siempre Viva 742, Santiago</p>

        <h3 className="separacion-titulo">Teléfonos</h3>
        <p>+56 9 1234 5678</p>
        <p>+56 2 2888 9900</p>
      </section>

      {/* Footer */}
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

export default Contacto