var busquedasRecientes = [];

function mostrarBusquedasRecientes() {
  var searchInput = document.getElementById("search-bar");
  var recentSearchesContainer = document.getElementById("recent-searches");

  // Limpiar las búsquedas recientes anteriores
  recentSearchesContainer.innerHTML = "";

  // Recorrer el array de busquedasRecientes y crear elementos de lista para cada una
  busquedasRecientes.forEach((busqueda) => {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    link.addEventListener("click", function (event) {
      event.preventDefault();
      scrollToElement("estadisticas");
      var valorEnlace = event.target.textContent; // Obtener el valor del enlace
      getStats(valorEnlace);
    });
    link.textContent = busqueda;

    listItem.appendChild(link);
    recentSearchesContainer.appendChild(listItem);
  });

  // Mostrar el contenedor de búsquedas recientes
  recentSearchesContainer.style.display = "block";
}

function scrollToElement(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

document.getElementById("lupa").addEventListener("click", function (event) {
  event.preventDefault();
  mostrarBusquedasRecientes();
});

document.getElementById("search-bar").addEventListener("focus", function () {
  mostrarBusquedasRecientes();
});

//Cerrar recent-searches
const mainElement = document.querySelector("main");
var recentSearchesContainer = document.getElementById("recent-searches");
var searchInputElement = document.getElementById("search-bar");

mainElement.addEventListener("click", function () {
  recentSearchesContainer.style.display = "none";
});

document.addEventListener("click", function (event) {
  var targetElement = event.target;
  if (
    targetElement !== searchInputElement &&
    !searchInputElement.contains(targetElement) &&
    targetElement !== recentSearchesContainer &&
    !recentSearchesContainer.contains(targetElement)
  ) {
    recentSearchesContainer.style.display = "none";
  }
});

document
  .getElementById("search-bar")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getStats(document.getElementById("search-bar").value);
      var searchTerm = event.target.value.trim();
      if (searchTerm !== "") {
        agregar(searchTerm);
        event.target.value = "";
      }
      setTimeout(function () {
        estadisticas.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  });

function agregar(favorito) {
  if (!busquedasRecientes.includes(favorito)) {
    busquedasRecientes.push(favorito);
  }
}
