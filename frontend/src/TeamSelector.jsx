import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./TeamSelector.css";
import API_URL from "./api";

function TeamSelector() {
  const [selectedTeam, setTeam] = useState();
  const [stats, setStats] = useState();
  const [teams, setTeams] = useState([]);
  const [displayedTeam, setDisplayedTeam] = useState();
  const teamBackgrounds = {
    "Athletic Club": "athletic-selected",
    "Club Atlético de Madrid": "atletico-selected",
    "FC Barcelona": "barcelona-selected",
    "RC Celta de Vigo": "celta-selected",
    "Deportivo Alavés": "alaves-selected",
    "Elche CF": "elche-selected",
    "RCD Espanyol de Barcelona": "espanyol-selected",
    "Getafe CF": "getafe-selected",
    "Girona FC": "girona-selected",
    "Levante UD": "levante-selected",
    "RCD Mallorca": "mallorca-selected",
    "CA Osasuna": "osasuna-selected",
    "Real Oviedo": "oviedo-selected",
    "Rayo Vallecano de Madrid": "rayo-selected",
    "Real Betis Balompié": "betis-selected",
    "Real Madrid CF": "madrid-selected",
    "Real Sociedad de Fútbol": "sociedad-selected",
    "Sevilla FC": "sevilla-selected",
    "Valencia CF": "valencia-selected",
    "Villarreal CF": "villarreal-selected",
  };

  const chooseTeam = (event) => {
    setTeam(event.target.value);
  };

  useEffect(() => {
    fetch(`${API_URL}/api/teams`)
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error(error));
  }, []);

  const getsStats = async () => {
    if (!selectedTeam) return;

    try {
      const response = await fetch(
        `${API_URL}/api/stats/${encodeURIComponent(selectedTeam)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch team statistics");
      }

      const data = await response.json();

      setStats(data);
      setDisplayedTeam(selectedTeam);

      console.log("Selected team:", selectedTeam);
      console.log("Background class:", teamBackgrounds[selectedTeam]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //Render
  return (
    <div
      className={`app-shell ${stats ? "has-stats" : "no-stats"} ${
        stats && displayedTeam ? teamBackgrounds[displayedTeam] || "" : ""
      }`}
    >
      <div className="controls">
        <select onChange={chooseTeam}>
          <option value="">Choose a team</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <button onClick={getsStats}> Choose </button>
      </div>
      {stats && <Dashboard stats={stats} displayedTeam={displayedTeam} />}
    </div>
  );
}

export default TeamSelector;
