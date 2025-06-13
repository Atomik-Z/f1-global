import { useState } from 'react';
import { useGetDriverStandingsQuery } from '../../services/f1Api';
import DriverPopup from '../../pages/Pilotes/DriverPopup';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AnimatedTableRow = styled.tr`
  opacity: 0;
  animation: ${slideInFromRight} 0.5s ease forwards;
  animation-delay: ${props => `${props.index * 0.2}s`};
`;

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
            <AnimatedTableRow key={index} index={index}>
              <td>{driver.position}</td>
              <td onClick={() => togglePopup(driver.Driver)} className="pilote">{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</td>
              <td>{driver.Constructors[0].name}</td>
              <td>{driver.wins}</td>
              <td>{driver.points}</td>
            </AnimatedTableRow>
          ))}
        </tbody>
      </table>
      <DriverPopup selectedDriver={selectedDriver} showPopup={showPopup} togglePopup={togglePopup} />
    </div>
  );
}

export default DrivStandings;
