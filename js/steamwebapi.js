function getStats(steamId) {
  const apiKey = "ae941d3c-598a-4fde-9b58-766e999f9c72"; /* Tracker.gg apikey */
  const url = `https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamId}?TRN-Api-Key=${apiKey}`;

  fetch(url, { mode: "cors" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta de la API");
      }
    })
    .then((response) => {
      const statsContainer = document.getElementById("stats");
      statsContainer.innerHTML = "";
      const stats = response.data.segments[0].stats;
      const statsKeys = Object.keys(stats);

      // Obtener la foto del jugador
      const avatarUrl = response.data.platformInfo.avatarUrl;

      // Crear el elemento de la foto del jugador
      const avatarImage = document.createElement("img");
      avatarImage.src = avatarUrl;
      avatarImage.alt = "Foto del jugador";
      avatarImage.className = "avatar-image";

      // Agregar la foto del jugador al contenedor de estadísticas
      statsContainer.appendChild(avatarImage);

      statsKeys.forEach((statKey) => {
        const statValue = stats[statKey].value;
        const statMaxValue = stats[statKey].maxValue;
        const progressPercentage = (statValue / statMaxValue) * 100;

        // Crear el elemento de la barra de progreso circular
        const circularProgress = document.createElement("div");
        circularProgress.className = "circular-progress";

        // Crear el elemento de la barra de progreso
        const progress = document.createElement("div");
        progress.className = "progress";

        // Crear el elemento del valor de progreso
        const progressValue = document.createElement("span");
        progressValue.className = "progress-value";
        progressValue.textContent = "0%";

        // Agregar los elementos de la barra de progreso al contenedor
        circularProgress.appendChild(progress);
        circularProgress.appendChild(progressValue);

        // Crear el elemento del ítem de estadística
        const statItem = document.createElement("div");
        statItem.className = "stat-item";
        statItem.innerHTML = `<p class="stat-label">${stats[statKey].displayName}: ${statValue}</p>`;

        // Agregar la barra de progreso al ítem de estadística
        statItem.appendChild(circularProgress);

        // Agregar el ítem de estadística al contenedor de estadísticas
        statsContainer.appendChild(statItem);

        // Animar la barra de progreso
        const maxRotation = 360; // Máximo de rotación en grados

        setTimeout(() => {
          const rotationAmount = progressPercentage * (maxRotation / 100); // Cálculo de la cantidad de rotación
          progress.style.transform = `rotate(${rotationAmount}deg)`;
          progressValue.textContent = `${progressPercentage.toFixed(0)}%`;

          const progressFill = document.createElement("div");
          progressFill.className = "progress-fill";
          progressFill.style.transform = `rotate(${rotationAmount}deg)`;

          progress.appendChild(progressFill);
        }, 100);
      });
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("stats").innerHTML =
        "<p>Error al obtener estadísticas del jugador</p>";
    });
}

const input = document.querySelector("#search-bar");
const estadisticas = document.getElementById("estadisticas");

const lupa = document.querySelector("#lupa");
lupa.addEventListener("click", () => {
  getStats(document.getElementById("search-bar").value);
  setTimeout(function () {
    estadisticas.scrollIntoView({ behavior: "smooth" });
  }, 100);
});
