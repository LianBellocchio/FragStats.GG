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
    link.href = "#";
    link.textContent = busqueda;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      agregar(busqueda);
    });
    listItem.appendChild(link);
    recentSearchesContainer.appendChild(listItem);
  });

  // Mostrar el contenedor de búsquedas recientes
  recentSearchesContainer.style.display = "block";
}

document.getElementById("lupa").addEventListener("click", function (event) {
  event.preventDefault();
  mostrarBusquedasRecientes();
});

document.getElementById("search-bar").addEventListener("focus", function () {
  mostrarBusquedasRecientes();
});

document.getElementById("search-bar").addEventListener("blur", function () {
  var recentSearchesContainer = document.getElementById("recent-searches");
  recentSearchesContainer.style.display = "none";
});

document.getElementById("search-bar").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getStats("#search-bar");
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