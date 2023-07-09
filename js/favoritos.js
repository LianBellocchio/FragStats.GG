var favoritos = "";
var ID = "1";

function traerFavoritos() {
  fetch(`http://plasmads.pythonanywhere.com/cuentas/${ID}`)
    .then((response) => response.json())
    .then((data) => {
      favoritos = data.favoritos;
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
  } else if (favoritos === favorito) {
    // Agrega esta condición
    favoritos = "";
  }
  modificarFavoritos(favoritos);
}

function agregar(favorito) {
  if (favoritos.indexOf(favorito) !== -1) {
    eliminar(favorito);
  } else {
    if (favoritos === "") {
      favoritos = favorito;
    } else {
      favoritos += "," + favorito;
    }
  }
  modificarFavoritos(favoritos);
}

//Aca agregar metodo PUT

// Este no anda
// function modificarFavoritos(favoritosModificados) {
//   var datosModificados = {
//     favoritos: favoritosModificados,
//   };

//   var options = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datosModificados),
//   };

//   fetch(`http://plasmads.pythonanywhere.com/cuentas/${ID}`, options)
//     .then(function (response) {
//       if (response.ok) {
//         console.log("Datos modificados exitosamente");
//       } else {
//         throw new Error("Error al modificar los datos");
//       }
//     })
//     .catch(function (error) {
//       console.error("Error al modificar los datos:", error);
//     });
// }

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
