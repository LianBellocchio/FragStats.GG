function getStats(input) {
  const steamId = document.querySelector(input).value;
  const apiKey = "ae941d3c-598a-4fde-9b58-766e999f9c72"; /* Tracker.gg apikey */
  const url = `https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamId}?TRN-Api-Key=${apiKey}`;
  fetch(url, {
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta de la API");
      }
    })
    .then((response) => {
      const totalKills = response.data.segments[0].stats.kills.value;
      const totalDeaths = response.data.segments[0].stats.deaths.value;
      const totalRoundsPlayed =
        response.data.segments[0].stats.roundsPlayed.value;
      const kdRatio = response.data.segments[0].stats.kd.value;
      const winPercentage = response.data.segments[0].stats.wlPercentage.value;

      const maxKills = 999999; // Valor máximo para las kills totales
      const maxDeaths = 999999; // Valor máximo para las muertes totales
      const maxKDRatio = 100; // Valor máximo para las kills totales
      const maxRounds = 999999; // Valor máximo para las muertes totales

      const html = `  <div id="stats">
      <div class="stat-item">
        <p>Kills totales: ${totalKills}</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${calculatePercentage(
            totalKills,
            maxKills
          )}%"></div>
        </div>
      </div>
  
      <div class="stat-item">
        <p>Muertes totales: ${totalDeaths}</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${calculatePercentage(
            totalDeaths,
            maxDeaths
          )}%"></div>
        </div>
      </div>
  
      <div class="stat-item">
        <p>Rondas jugadas: ${totalRoundsPlayed}</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${calculatePercentage(
            totalRoundsPlayed,
            maxRounds
          )}%"></div>
        </div>
      </div>
  
      <div class="stat-item">
        <p>K/D ratio: ${kdRatio.toFixed(2)}</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${calculatePercentage(
            kdRatio,
            maxKDRatio
          )}%"></div>
        </div>
      </div>
  
      <div class="stat-item">
        <p>Porcentaje de victorias: ${winPercentage.toFixed(2)}%</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${winPercentage}%"></div>
        </div>
      </div>
    </div>`;
      document.getElementById("stats").innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("stats").innerHTML =
        "<p>Error al obtener estadísticas del jugador</p>";
    });
}

function calculatePercentage(value, max) {
  return (value / max) * 100;
}

const input = document.querySelector("#search-bar");
const estadisticas = document.getElementById("estadisticas");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getStats("#search-bar");
    setTimeout(function () {
      estadisticas.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }
});

const lupa = document.querySelector("#lupa");
lupa.addEventListener("click", () => {
  getStats("#search-bar");
  setTimeout(function () {
    estadisticas.scrollIntoView({ behavior: "smooth" });
  }, 1000);
});
