var favoritos = "";

function eliminar(favorito) {
  if (favoritos.indexOf(favorito + ",") !== -1) {
    favoritos = favoritos.replace(favorito + ",", "");
  } else if (favoritos.indexOf("," + favorito) !== -1) {
    favoritos = favoritos.replace("," + favorito, "");
  } else {
    favoritos = favoritos.replace(favorito, "");
  }
}

function agregar(favorito) {
  if (favoritos.indexOf(favorito) !== -1) {
    eliminar(favoritos, favorito);
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
