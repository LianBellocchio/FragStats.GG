function mostrarRanking() {
  const apiKey = "a1833a7be9fa4e6db2b543e6a4f7759f";
  const url = `https://api.sportsdata.io/v3/csgo/scores/json/Competitions?key=a1833a7be9fa4e6db2b543e6a4f7759f`;

  fetch(url)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(
          `No se pudo obtener los datos de competiciones: ${respuesta.status}`
        );
      }
      return respuesta.json();
    })
    .then((datos) => {
      const tabla = document.getElementById("tabla-competiciones");
      const thead = tabla.querySelector("thead");
      const tbody = tabla.querySelector("tbody");
      tbody.innerHTML = ""; // Limpiar el cuerpo de la tabla

      // Mostrar el encabezado de la tabla
      thead.removeAttribute("hidden");

      datos.forEach((competicion) => {
        const fila = document.createElement("tr");

        const columnas = [competicion.AreaName, competicion.Name];

        columnas.forEach((columna) => {
          const celda = document.createElement("td");
          celda.textContent = columna;
          fila.appendChild(celda);
        });

        // Agregar una nueva celda con un puntaje aleatorio
        const puntaje = Math.floor(Math.random() * 100 + 1000);
        const celdaPuntaje = document.createElement("td");
        celdaPuntaje.textContent = puntaje;
        celdaPuntaje.setAttribute("data-alias", "puntaje");
        fila.appendChild(celdaPuntaje);

        tbody.appendChild(fila);
      });
    })
    .catch((error) => console.error(error));
}
