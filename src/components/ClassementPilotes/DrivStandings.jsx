import { useState } from 'react';
import { useGetDriverStandingsQuery } from '../../services/f1Api';
import DriverPopup from '../../pages/Pilotes/DriverPopup';
import { useParams } from 'react-router-dom';

function DrivStandings() {
  const {year} = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const togglePopup = (driver) => {
    setShowPopup(!showPopup);
    setSelectedDriver(driver);
  };

  const { data: standings, isLoading} = useGetDriverStandingsQuery(year);
  const driverStandings = standings?.MRData.StandingsTable.StandingsLists[0].DriverStandings;

  return !isLoading && (
    <div>
      <table className="Drivers">
        <thead>
          <tr>
            <th>Position</th>
            <th>Pilote</th>
            <th>Équipe</th>
            <th>Victoires</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {driverStandings.map((driver, index) => (
            <tr key={index}>
              <td>{driver.position}</td>
              <td onClick={() => togglePopup(driver.Driver)} class="pilote">{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</td>
              <td>{driver.Constructors[0].name}</td>
              <td>{driver.wins}</td>
              <td>{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DriverPopup selectedDriver={selectedDriver} showPopup={showPopup} togglePopup={togglePopup} />
    </div>
  );
}

export default DrivStandings;