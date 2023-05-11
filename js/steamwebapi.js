function getStats(input) {
  const steamId = document.getElementById(input).value;
  const apiKey = "ae941d3c-598a-4fde-9b58-766e999f9c72";
  const url = `https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamId}?TRN-Api-Key=${apiKey}`;
  fetch(url, {
    mode: "cors",
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta de la API");
      }
    })
    .then((response) => {
      const totalKills = response.data.segments[0].stats.kills.value;
      const totalDeaths = response.data.segments[0].stats.deaths.value;
      const totalRoundsPlayed = response.data.segments[0].stats.roundsPlayed.value;
      const kdRatio = response.data.segments[0].stats.kd.value;
      const winPercentage = response.data.segments[0].stats.wlPercentage.value;
      const html = `<p>Kills totales: ${totalKills}</p>
                    <p>Muertes totales: ${totalDeaths}</p>
                    <p>Rondas jugadas: ${totalRoundsPlayed}</p>
                    <p>K/D ratio: ${kdRatio.toFixed(2)}</p>
                    <p>Porcentaje de victorias: ${winPercentage.toFixed(2)}%</p>`;
      document.getElementById("stats").innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("stats").innerHTML = "<p>Error al obtener estadísticas del jugador</p>";
    });
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
