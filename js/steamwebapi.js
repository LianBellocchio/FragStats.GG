function getStats() {
  const steamId = document.getElementById("steam-id").value;
  const apiKey = "DF49C4D882FE9530A497F7AFD86D196F";
  const url = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${apiKey}&steamid=${steamId}`;
  fetch(url, {
    mode: 'cors'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta de la API");
      }
    })
    .then(data => {
      const stats = data.playerstats.stats;
      const totalKills = stats.find(stat => stat.name === "total_kills").value;
      const totalDeaths = stats.find(stat => stat.name === "total_deaths").value;
      const totalRoundsPlayed = stats.find(stat => stat.name === "total_rounds_played").value;
      const kdRatio = totalKills / totalDeaths;
      const winPercentage = (stats.find(stat => stat.name === "total_wins").value / stats.find(stat => stat.name === "total_matches_played").value) * 100;
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


