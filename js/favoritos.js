var favoritos = "";
var busquedasRecientes = [];
var ID = localStorage.getItem("id");

function traerFavoritos() {
  return fetch(`http://plasmads.pythonanywhere.com/cuentas/${ID}`)
    .then((response) => response.json())
    .then((data) => {
      this.id = data.id;
      this.nombre = data.nombre;
      this.correo = data.correo;
      this.contrasena = data.contrasena;
      this.favoritos = data.favoritos;
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
}

function eliminar(favorito) {
  if (favoritos.indexOf(favorito + ",") !== -1) {
    favoritos = favoritos.replace(favorito + ",", "");
  } else if (favoritos.indexOf("," + favorito) !== -1) {
    favoritos = favoritos.replace("," + favorito, "");
  } else {
    favoritos = favoritos.replace(favorito, "");
  }
  modificarFavoritos(1, favoritos);
}

function agregar(favorito) {
  traerFavoritos().then(() => {
    // Realizar búsqueda aquí
    fetch(`https://api.tracker.gg/v2/search?platform=steam&query=${favorito}`)
      .then((response) => response.json())
      .then((data) => {
        // Verificar si se encontraron resultados de búsqueda
        if (data.data && data.data.length > 0) {
          // Obtener el primer resultado de búsqueda (asumiendo que es el más relevante)
          const resultado = data.data[0];
          const nombre = resultado.attributes.name;
          const tipo = resultado.type;

          // Realizar acciones basadas en el tipo de resultado (jugador, equipo, etc.)
          if (tipo === "player") {
            // Acciones para jugador
            const jugadorId = resultado.id;
            // Resto del código para agregar o eliminar el favorito
          } else if (tipo === "team") {
            // Acciones para equipo
            const equipoId = resultado.id;
            // Resto del código para agregar o eliminar el favorito
          } else {
            // Otro tipo de resultado
            console.log("Tipo de resultado no compatible:", tipo);
          }

          // Verificar si la búsqueda ya existe en las busquedasRecientes
          if (!busquedasRecientes.includes(favorito)) {
            busquedasRecientes.push(favorito);
          }

          if (favoritos !== null && favoritos.indexOf(favorito) !== -1) {
            eliminar(favorito);
          } else {
            if (favoritos === "" || favoritos === null) {
              favoritos = favorito;
            } else {
              favoritos += "," + favorito;
            }
            modificarFavoritos(1, favoritos);
          }
        } else {
          console.log("No se encontraron resultados de búsqueda");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
      });
  });
}

function modificarFavoritos(id, favoritosModificados) {
  var url = `http://plasmads.pythonanywhere.com/cuentas/${ID}`;
  traerFavoritos().then(() => {
    var datosModificados = {
      contrasena: contrasena,
      correo: correo,
      id: id,
      nombre: nombre,
      favoritos: favoritosModificados,
    };
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosModificados),
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          console.log("Datos modificados exitosamente");
        } else {
          throw new Error("Error al modificar los datos");
        }
      })
      .catch((error) => {
        console.error("Error al modificar los datos:", error);
      });
  });
}

function mostrarBusquedasRecientes() {
  var searchInput = document.getElementById("search-bar");
  var recentSearchesContainer = document.getElementById("recent-searches");

  // Limpiar las búsquedas recientes anteriores
  recentSearchesContainer.innerHTML = "";

  // Recorrer el array de busquedasRecientes y crear elementos de lista para cada una
  busquedasRecientes.forEach((busqueda) => {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#"; // Agrega la acción que deseas para redirigir a la búsqueda

    // Establecer el texto de la búsqueda en el enlace
    link.textContent = busqueda;

    // Agregar un evento de clic al enlace para agregar la búsqueda a favoritos
    link.addEventListener("click", function (event) {
      event.preventDefault();
      agregar(busqueda);
    });

    // Agregar el enlace al elemento de lista y el elemento de lista al contenedor de búsquedas recientes
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

// No existe el elemento guardarFavorito
/* document.getElementById("guardarFavorito").addEventListener("click", function (event) {
  event.preventDefault();
  agregar(document.getElementById("favorito").value);
}); */
