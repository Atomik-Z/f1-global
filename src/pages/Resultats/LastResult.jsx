import { useGetLastRaceResultsQuery } from "../../services/f1Api";
import DriverPopup from "../Pilotes/DriverPopup";
import ConstructorPopup from "../Constructeurs/ConstructorPopup";
import { useState } from "react";

function LastResult() {
  const { data: resultat, isLoading } = useGetLastRaceResultsQuery();
  const raceResults = resultat?.MRData.RaceTable.Races[0]?.Results;
  const raceName = resultat?.MRData.RaceTable.Races[0]?.raceName;

  const [showDriverPopup, setShowDriverPopup] = useState(false);
  const [showConstructorPopup, setShowConstructorPopup] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedConstructor, setSelectedConstructor] = useState(null);

  const toggleDriverPopup = (driver) => {
    setShowDriverPopup(!showDriverPopup);
    setSelectedDriver(driver);
  };

  const toggleConstructorPopup = (constructor) => {
    setShowConstructorPopup(!showConstructorPopup);
    setSelectedConstructor(constructor);
  };

  const getTextColor = (index) => {
    switch(index) {
      case 0: return "#FFD700"; // doré
      case 1: return "#C0C0C0"; // argent
      case 2: return "#CD7F32"; // bronze
      default: return "inherit";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!raceResults) return <div>Aucun résultat disponible</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h3>Résultats à l'arrivée - {raceName}</h3>
        <table className="resultat" style={{ borderCollapse: 'collapse', width: 'auto' }}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Pilote</th>
              <th>Constructeur</th>
              <th>Points</th>
              <th>Temps de course</th>
            </tr>
          </thead>
          <tbody>
            {raceResults.map((result, index) => (
              <tr key={index} style={{ color: getTextColor(index) }}>
                <td>{result.position}</td>
                <td
                  onClick={() => toggleDriverPopup(result.Driver)}
                  className="pilote"
                >
                  {result.Driver.givenName} {result.Driver.familyName}
                </td>
                <td
                  onClick={() => toggleConstructorPopup(result.Constructor)}
                  className="constructeur"
                >
                  {result.Constructor.name}
                </td>
                <td>{result.points}</td>
                <td>{result.Time?.time || result.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <DriverPopup
          selectedDriver={selectedDriver}
          showPopup={showDriverPopup}
          togglePopup={toggleDriverPopup}
        /> 
        <ConstructorPopup
          selectedConstructor={selectedConstructor}
          showPopup={showConstructorPopup}
          togglePopup={toggleConstructorPopup}
        />
      </div>
    </div>
  );
}

export default LastResult;
