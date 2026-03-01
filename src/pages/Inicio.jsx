import { Link } from "react-router-dom"
import { useState } from "react"

function Inicio() {
  const [menuAbierto, setMenuAbierto] = useState(false)

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
            <Link className="list-group-item list-group-item-action active" to="/">Inicio</Link>
            <Link className="list-group-item list-group-item-action" to="/figuras">Figuras</Link>
            <Link className="list-group-item list-group-item-action" to="/poleras">Poleras</Link>
            <Link className="list-group-item list-group-item-action" to="/contacto">Contacto</Link>
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

        {/* Tablet */}
        <div className="d-none d-md-block d-xl-none">
          <div className="bg-dark rounded-3 px-3 py-2">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link text-white fw-semibold" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/figuras">Figuras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/poleras">Poleras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contacto">Contacto</Link>
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

        {/* Mobile */}
        <div className="d-md-none">
          <nav className="navbar navbar-dark bg-dark rounded-3 px-3">
            <span className="navbar-brand fw-semibold">AniméStore</span>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
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

      {/* PRODUCTOS DESTACADOS */}
      <section className="producto p1">
        <img src="https://www.geekz.cl/web/image/product.product/21745/image?unique=9fc6597" alt="Figura 1" />
      </section>

      <section className="producto p2">
        <img src="https://www.geekz.cl/web/image/product.product/21343/image?unique=b5d3198" alt="Figura 2" />
      </section>

      <section className="producto p3">
        <img src="https://www.geekz.cl/web/image/product.product/20570/image?unique=2ca4120" alt="Figura 3" />
      </section>

      <section className="producto p4">
        <img src="https://www.geekz.cl/web/image/product.product/20699/image?unique=b5d3198" alt="Figura 4" />
      </section>

      <main className="seccion-main">
        <div className="main-bienvenida">
          <h2>Bienvenido!</h2>
          <p>
            En <strong>AniméStore</strong> encontrarás artículos inspirados en tus series favoritas:
            figuras, poleras y pósters.
          </p>
        </div>

        <div className="main-contenido-inferior">
          <div className="main-fragmento">
            <h3>Categorías</h3>
            <ul>
              <li>Figuras</li>
              <li>Poleras</li>
              <li>Pósters</li>
            </ul>
          </div>

          <div className="main-fragmento">
            <h3>Pasos para comprar</h3>
            <ol>
              <li>Elige un producto</li>
              <li>Revisa los detalles</li>
              <li>Contáctanos para coordinar el pago</li>
            </ol>
          </div>
        </div>
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

export default Inicio