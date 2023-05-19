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

// Asignar eventos a los botones
abrirMenu.addEventListener("click", abrirMenuHamburguesa);
cerrarMenu.addEventListener("click", cerrarMenuHamburguesa);
