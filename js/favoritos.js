var favoritos = "";

function eliminar(favorito) {
  if (favoritos.indexOf(favorito + ",") !== -1) {
    favoritos = favoritos.replace(favorito + ",", "");
  } else if (favoritos.indexOf("," + favorito) !== -1) {
    favoritos = favoritos.replace("," + favorito, "");
  } else if (favoritos === favorito) { // Agrega esta condición
    favoritos = "";
  }
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
}

function obtenerFavoritos() {
  const arrayFavoritos = favoritos.split(",");
  return arrayFavoritos;
}
