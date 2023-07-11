var abrirMenu = document.getElementById("abrir");
var cerrarMenu = document.getElementById("cerrar");
var nav = document.getElementById("nav");

function abrirMenuHamburguesa() {
  abrirMenu.classList.add("open");
  setTimeout(function () {
    nav.style.display = "block";
  }, 700);
}

function cerrarMenuHamburguesa() {
  abrirMenu.classList.add("close");
  setTimeout(function () {
    nav.style.display = "none";
    abrirMenu.classList.remove("open", "close");
  }, 700);
}

abrirMenu.addEventListener("click", abrirMenuHamburguesa);
cerrarMenu.addEventListener("click", cerrarMenuHamburguesa);

const navbar = document.querySelector("#nav");

function setNavbarDisplay() {
  if (window.innerWidth < 768) {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
}

setNavbarDisplay();

window.addEventListener("resize", setNavbarDisplay);

function cambiarPlaceholder() {
  let input = document.getElementById("search-bar");
  input.placeholder = "Buscar Jugador";
}

var mediaQuery = window.matchMedia("(max-width: 480px)");

if (mediaQuery.matches) {
  cambiarPlaceholder();
}

mediaQuery.addEventListener("change", function (event) {
  if (event.matches) {
    cambiarPlaceholder();
  }
});
