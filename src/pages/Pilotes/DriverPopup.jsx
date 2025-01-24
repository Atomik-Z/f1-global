import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetDriverStandingsQuery } from '../../services/f1Api';

const StyledDriverLink = styled(Link)`
    color: #ffffff;
`

function DriverPopup({ selectedDriver, showPopup, togglePopup }) {
  const {year} = useParams();
  const { data: standings, isLoading} = useGetDriverStandingsQuery(year);
  const driverStandings = standings?.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  const driverData = driverStandings?.map(driver => ({
    id: driver.Driver.driverId,
    wins: driver.wins,
    points: driver.points
  }));

  const driver = driverData?.find(d => d.id === selectedDriver?.driverId);

  return !isLoading && (
    showPopup && selectedDriver && (
      <div className="popup">
        <h2>{`${selectedDriver.givenName} ${selectedDriver.familyName}`}</h2>
        <p>Victoires : {driver.wins}</p>
        <p>Points : {driver.points}</p>
        <StyledDriverLink to={`/driver/${selectedDriver.driverId}`}>En savoir plus</StyledDriverLink>
        <div>
          <button onClick={togglePopup}>Fermer</button>
        </div>
      </div>
    )
  );
}

export default DriverPopup