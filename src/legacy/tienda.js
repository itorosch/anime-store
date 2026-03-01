/*
    Semana 6 - Frontend I (PFY2201)
    Archivo: tienda.js

    Objetivo:
    - Cargar productos desde un JSON local usando Fetch API
    - Filtrar por categoría según la página (figuras.html / poleras.html)
    - Renderizar productos dinámicamente con manipulación del DOM
    - Implementar carrito de compras (agregar, eliminar, vaciar, total)
    - Implementar buscador con evento submit (preventDefault)
    - Manejo de error si falla la carga del JSON

    Nota:
    - El carrito se guarda en localStorage para mantenerse entre páginas.
*/

"use strict";

// ---------------------------
// Selectores del DOM
// ---------------------------
const contenedorProductos = document.getElementById("contenedor-productos");
const mensaje = document.getElementById("mensaje");

const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");

const carritoLista = document.getElementById("carrito-lista");
const carritoTotalSpan = document.getElementById("carrito-total");
const btnVaciar = document.getElementById("btn-vaciar");

// ---------------------------
// Estado de la aplicación
// ---------------------------
let productos = [];           // Productos cargados desde JSON
let productosFiltrados = [];  // Productos filtrados por categoría (según página)
let carrito = [];             // Carrito: { id, nombre, precio, cantidad }

// ---------------------------
// Utilidades
// ---------------------------
function obtenerCategoriaDesdePagina() {
  // Detecta la categoría según el nombre del archivo HTML
  const pagina = window.location.pathname.toLowerCase();
  if (pagina.includes("figuras")) return "figuras";
  if (pagina.includes("poleras")) return "poleras";
  return "";
}

function formatearPesos(valor) {
  // Formatea números con separador de miles (estilo Chile)
  // Ej: 19990 -> 19.990
  return new Intl.NumberFormat("es-CL").format(valor);
}

function mostrarMensaje(texto, tipo = "info") {
  // Muestra mensajes usando alert de Bootstrap (info, success, warning, danger)
  if (!mensaje) return;

  if (!texto) {
    mensaje.innerHTML = "";
    return;
  }

  mensaje.innerHTML = `
    <div class="alert alert-${tipo} mb-0" role="alert">
      ${texto}
    </div>
  `;
}

// ---------------------------
// Fetch: Cargar productos desde JSON local
// ---------------------------
async function cargarProductos() {
  try {
    mostrarMensaje("Cargando productos...", "info");

    // JSON local (carpeta data al mismo nivel que los HTML)
    const response = await fetch("data/productos.json");

    // Si la respuesta no es OK, lanzamos error para que lo capture el catch
    if (!response.ok) {
      throw new Error("No se pudo cargar productos.json (HTTP no OK)");
    }

    productos = await response.json();

    // Filtrar por categoría según la página actual
    const categoria = obtenerCategoriaDesdePagina();
    productosFiltrados = productos.filter((p) => p.categoria === categoria);

    // Renderizar catálogo
    renderProductos(productosFiltrados);

    // Quitar mensaje al finalizar correctamente
    mostrarMensaje("", "info");
  } catch (error) {
    console.error(error);
    mostrarMensaje(
      "Error: no se pudieron cargar los productos. Verifica la ruta 'data/productos.json' y que el JSON esté válido.",
      "danger"
    );
  }
}

// ---------------------------
// Render de productos (DOM)
// ---------------------------
function renderProductos(lista) {
  if (!contenedorProductos) return;

  // Limpia el contenedor (similar a lo visto en demo de DOM: replaceChildren)
  contenedorProductos.replaceChildren();

  if (!lista || lista.length === 0) {
    mostrarMensaje("No hay productos para mostrar.", "warning");
    return;
  }

  const fragment = document.createDocumentFragment();

  lista.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";

    // Card Bootstrap
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" style="object-fit:contain; height:220px;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text mb-3"><strong>$${formatearPesos(p.precio)}</strong></p>
          <button class="btn btn-dark mt-auto" type="button" data-id="${p.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;

    // Evento click para agregar al carrito
    const btn = col.querySelector("button[data-id]");
    btn.addEventListener("click", () => {
      agregarAlCarrito(p.id);
    });

    fragment.appendChild(col);
  });

  contenedorProductos.appendChild(fragment);
}

// ---------------------------
// Carrito (DOM + localStorage)
// ---------------------------
function cargarCarritoDesdeStorage() {
  const guardado = localStorage.getItem("carritoAnimeStore");
  carrito = guardado ? JSON.parse(guardado) : [];
  renderCarrito();
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carritoAnimeStore", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
  // Busca el producto en el arreglo general "productos"
  const prod = productos.find((p) => p.id === idProducto);
  if (!prod) return;

  // Si ya existe, aumenta cantidad; si no, lo agrega con cantidad 1
  const existe = carrito.find((item) => item.id === idProducto);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      cantidad: 1,
    });
  }

  guardarCarritoEnStorage();
  renderCarrito();

  // Mensaje breve de confirmación
  mostrarMensaje("Producto agregado al carrito.", "success");
  setTimeout(() => {
    mostrarMensaje("", "info");
  }, 1200);
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter((item) => item.id !== idProducto);
  guardarCarritoEnStorage();
  renderCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarritoEnStorage();
  renderCarrito();
}

function calcularTotal() {
  // Suma (precio * cantidad) de cada item
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function renderCarrito() {
  if (!carritoLista || !carritoTotalSpan) return;

  // Limpia la lista del carrito
  carritoLista.replaceChildren();

  // Crea un <li> por cada item (DOM dinámico)
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <div class="fw-semibold">${item.nombre}</div>
        <small>Cantidad: ${item.cantidad}</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="fw-semibold">$${formatearPesos(item.precio * item.cantidad)}</span>
        <button class="btn btn-sm btn-outline-danger" type="button">X</button>
      </div>
    `;

    // Botón X elimina el ítem del carrito
    li.querySelector("button").addEventListener("click", () => eliminarDelCarrito(item.id));

    carritoLista.appendChild(li);
  });

  // Total
  carritoTotalSpan.textContent = formatearPesos(calcularTotal());
}

// ---------------------------
// Búsqueda (evento submit)
// ---------------------------
function configurarBusqueda() {
  if (!formBusqueda || !inputBusqueda) return;

  formBusqueda.addEventListener("submit", (e) => {
    // Evita recargar la página (requisito típico de pauta)
    e.preventDefault();

    const texto = inputBusqueda.value.trim().toLowerCase();

    // Si no hay texto, vuelve al catálogo completo filtrado por categoría
    if (!texto) {
      renderProductos(productosFiltrados);
      mostrarMensaje("", "info");
      return;
    }

    // Filtra por nombre
    const resultados = productosFiltrados.filter((p) =>
      p.nombre.toLowerCase().includes(texto)
    );

    if (resultados.length === 0) {
      mostrarMensaje("No se encontraron resultados para tu búsqueda.", "warning");
    } else {
      mostrarMensaje("", "info");
    }

    renderProductos(resultados);
  });
}

// ---------------------------
// Inicialización
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1) Carrito persistente
  cargarCarritoDesdeStorage();

  // 2) Buscador
  configurarBusqueda();

  // 3) Botón vaciar carrito
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }

  // 4) Cargar productos por fetch
  cargarProductos();
});