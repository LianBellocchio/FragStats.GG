// Obtener referencias a los elementos del menú
var abrirMenu = document.getElementById("abrir");
var cerrarMenu = document.getElementById("cerrar");
var nav = document.getElementById("nav");

// Función para abrir el menú
function abrirMenuHamburguesa() {
  nav.style.display = "block";
}

// Función para cerrar el menú
function cerrarMenuHamburguesa() {
  nav.style.display = "none";
}

// Función para mantener el nav visible
function minWidth(){
  if (query.matches){
    document.querySelector('nav').style.display = "block";
  }
}
// Asignar eventos a los botones
abrirMenu.addEventListener("click", abrirMenuHamburguesa);
cerrarMenu.addEventListener("click", cerrarMenuHamburguesa);

// Mantener la nav-bar visible
const navbar = document.querySelector('#nav');

function setNavbarDisplay() {
  if (window.innerWidth < 768) { // Navbar debería estar escondida en tamaños más chicos
    navbar.style.display = 'none';
  } else {
    navbar.style.display = 'block';
  }
}

// Ejecuta la function al cargar la página
setNavbarDisplay();

// Event listener al cambiar el tamaño de pantalla
window.addEventListener('resize', setNavbarDisplay);


