var favoritos = "";
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

function obtenerFavoritos() {
  const arrayFavoritos = favoritos.split(",");
  return arrayFavoritos;
}

document
  .getElementById("guardarFavorito")
  .addEventListener("click", function (event) {
    event.preventDefault();
    agregar(document.getElementById("favorito").value);
  });
