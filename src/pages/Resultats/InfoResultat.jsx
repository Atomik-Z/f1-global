import {
  useGetRaceResultsQuery,
  useGetQualifyingResultsQuery,
  useGetSprintResultsQuery,
} from "../../services/f1Api";
import { useParams } from "react-router-dom";
import DriverPopup from "../Pilotes/DriverPopup";
import ConstructorPopup from "../Constructeurs/ConstructorPopup";
import { useState } from "react";

function InfoResultat({ session }) {
  // ✅ Chaque hook est conditionné avec skip (seul celui sélectionné est actif)
  const { year, race } = useParams()
  const raceQuery = useGetRaceResultsQuery(
    { season: year, race },
    { skip: session !== "race" }
  );

  const qualifQuery = useGetQualifyingResultsQuery(
    { season: year, race },
    { skip: session !== "qualif" }
  );

  const sprintQuery = useGetSprintResultsQuery(
    { season: year, race },
    { skip: session !== "sprint" }
  );

  // ✅ Sélection de la bonne query selon session
  let query;
  switch (session) {
    case "qualif":
      query = qualifQuery;
      break;
    case "sprint":
      query = sprintQuery;
      break;
    default:
      query = raceQuery;
  }

  const { data: resultat, isLoading, isError } = query || {};
  let raceResults;

  if (resultat?.MRData?.RaceTable?.Races?.length > 0) {
    const raceData = resultat.MRData.RaceTable.Races[0];

    switch (session) {
      case "qualif":
        raceResults = raceData.QualifyingResults;
        break;
      case "sprint":
        raceResults = raceData.SprintResults;
        break;
      default:
        raceResults = raceData.Results;
    }
  }

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Erreur lors du chargement des données</div>;
  if (!raceResults) return <div>Aucun résultat disponible</div>;


  const renderHeader = () => {
    switch (session) {
      case "qualif":
        return (
          <tr>
            <th>Position</th>
            <th>Pilote</th>
            <th>Constructeur</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
          </tr>
        );
      default: // race / sprint
        return (
          <tr>
            <th>Position</th>
            <th>Pilote</th>
            <th>Constructeur</th>
            <th>Points</th>
            <th>Statut</th>
          </tr>
        );
    }
  };

  const getMedalColor = (index) => {
    switch (index) {
      case 0:
        return "#FFD700"; // or pour 1ère place
      case 1:
        return "#C0C0C0"; // argent pour 2ème place
      case 2:
        return "#CD7F32"; // bronze pour 3ème place
      default:
        return "#FFFFFF"; // aucune couleur pour les autres
    }
  };


  const renderRow = (result, index) => {
    const rowStyle = {color: getMedalColor(index) }
    switch (session) {
      case "qualif":
        return (
          <tr key={index} style={rowStyle}>
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
            <td>{result.Q1 || "-"}</td>
            <td>{result.Q2 || "-"}</td>
            <td>{result.Q3 || "-"}</td>
          </tr>
        );
      default: // race / sprint
        return (
          <tr key={index} style={rowStyle}>
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
        );
    }
  };

  return (
    <div>
      <h3>
        Résultats - {raceName} ({session})
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table className="resultat">
          <thead>{renderHeader()}</thead>
          <tbody>
            {raceResults.map((result, index) => renderRow(result, index))}
          </tbody>
        </table>
      </div>


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
  );
}

export default InfoResultat;




