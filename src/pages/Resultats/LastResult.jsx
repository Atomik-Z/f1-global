import { useGetLastRaceResultsQuery } from "../../services/f1Api"
import DriverPopup from "../Pilotes/DriverPopup";
import { useState } from "react";
import ConstructorPopup from "../Constructeurs/ConstructorPopup";

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

    return !isLoading && raceResults ? (
    <div>
      <h3>Résultats à l'arrivée - {raceName}</h3>
      <table class="resultat">
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
            <tr key={index}>
              <td>{result.position}</td>
              <td onClick={() => toggleDriverPopup(result.Driver)} class="pilote">{result.Driver.givenName} {result.Driver.familyName}</td>
              <td onClick={() => toggleConstructorPopup(result.Constructor)} class="constructeur">{result.Constructor.name}</td>
              <td>{result.points}</td>
              <td>{result.Time?.time || result.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DriverPopup selectedDriver={selectedDriver} showPopup={showDriverPopup} togglePopup={toggleDriverPopup} /> 
      <ConstructorPopup selectedConstructor={selectedConstructor} showPopup={showConstructorPopup} togglePopup={toggleConstructorPopup} />
    </div>
    ) : (
        <div>Loading...</div>
    )
}

export default LastResult