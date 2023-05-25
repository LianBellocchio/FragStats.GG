function getStats(input) {
  const steamId = document.querySelector(input).value;
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

      statsKeys.forEach((statKey) => {
        const statValue = stats[statKey].value;
        const statMaxValue = stats[statKey].maxValue;

        const progressPercentage = (statValue / statMaxValue) * 100;

        const circularProgress = document.createElement("div");
        circularProgress.className = "circular-progress";

        const progress = document.createElement("div");
        progress.className = "progress";
        progress.style.transform = `rotate(${progressPercentage * 3.6}deg)`;

        const progressValue = document.createElement("span");
        progressValue.className = "progress-value";
        progressValue.textContent = `${progressPercentage.toFixed(0)}%`;

        circularProgress.appendChild(progress);
        circularProgress.appendChild(progressValue);

        const statItem = document.createElement("div");
        statItem.className = "stat-item";
        statItem.innerHTML = `<p class="stat-label">${stats[statKey].displayName}: ${statValue}</p>`;
        statItem.appendChild(circularProgress);

        statsContainer.appendChild(statItem);
      });
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("stats").innerHTML =
        "<p>Error al obtener estadísticas del jugador</p>";
    });
}
