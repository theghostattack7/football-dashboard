import "./Dashboard.css";
import DonutChart from "./DonutChart";
import CountUp from "./CountUp";

function Dashboard({ stats, displayedTeam }) {
  const teamBadges = {
    "Athletic Club": "/badge/athletic-club.png",
    "Club Atlético de Madrid": "/badge/atletico-madrid.png",
    "FC Barcelona": "/badge/barcelona.png",
    "RC Celta de Vigo": "/badge/celta-vigo.png",
    "Deportivo Alavés": "/badge/deportivo-alaves.png",
    "Elche CF": "/badge/elche.png",
    "RCD Espanyol de Barcelona": "/badge/espanyol.png",
    "Getafe CF": "/badge/getafe.png",
    "Girona FC": "/badge/girona.png",
    "Levante UD": "/badge/levante.png",
    "RCD Mallorca": "/badge/mallorca.png",
    "CA Osasuna": "/badge/osasuna.png",
    "Real Oviedo": "/badge/oviedo.png",
    "Rayo Vallecano de Madrid": "/badge/rayo-vallecano.png",
    "Real Betis Balompié": "/badge/real-betis.png",
    "Real Madrid CF": "/badge/real-madrid.png",
    "Real Sociedad de Fútbol": "/badge/real-sociedad.png",
    "Sevilla FC": "/badge/sevilla.png",
    "Valencia CF": "/badge/valencia.png",
    "Villarreal CF": "/badge/villarreal.png",
  };

  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
  return (
    <div className="main-div">
      <div className="team-div">
        {stats && displayedTeam && (
          <img
            className="badge"
            src={teamBadges[displayedTeam]}
            alt={`${displayedTeam} badge`}
          ></img>
        )}
        <div className="team-info">
          <div className="team-name">{displayedTeam}</div>
          <div className="team-position">
            <CountUp value={stats.position} />
            <sup>{ordinal(stats.position)}</sup> place · {stats.points} pts
          </div>
        </div>
      </div>
      <div className="goals-div">
        <div className="goals-scored-div">
          <p className="goals-scored">
            <CountUp value={stats.scored} />
          </p>
          <p className="goal-text"> Goals scored</p>
        </div>
        <div className="goals-conceded-div">
          <p className="goals-concede">
            <CountUp value={stats.conceded} />
          </p>
          <p className="goal-text"> Goals conceded </p>
        </div>
      </div>
      <div className="results-card">
        <div className="rectangle total-bar">
          {stats.won > 0 && (
            <div
              className="segment won-fill"
              style={{ flexGrow: stats.won }}
            ></div>
          )}
          {stats.lost > 0 && (
            <div
              className="segment lost-fill"
              style={{ flexGrow: stats.lost }}
            ></div>
          )}
          {stats.tied > 0 && (
            <div
              className="segment tied-fill"
              style={{ flexGrow: stats.tied }}
            ></div>
          )}
        </div>
        <div className="matches-div">
          <DonutChart stats={stats} />
          <div className="matches-text">
            <p className="won">
              <CountUp value={stats.won} /> Won
            </p>
            <p className="lost">
              <CountUp value={stats.lost} /> Lost
            </p>
            <p className="tied">
              <CountUp value={stats.tied} /> Tied
            </p>
          </div>
          <div className="bars">
            <div className="rectangle">
              <div
                className="bar-fill won-fill"
                style={{ width: `${(stats.won / stats.played) * 100}%` }}
              ></div>
            </div>

            <div className="rectangle">
              <div
                className="bar-fill lost-fill"
                style={{ width: `${(stats.lost / stats.played) * 100}%` }}
              ></div>
            </div>

            <div className="rectangle">
              <div
                className="bar-fill tied-fill"
                style={{ width: `${(stats.tied / stats.played) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
