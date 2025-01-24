import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetConstructorStandingsQuery } from '../../services/f1Api';

const StyledConstructorLink = styled(Link)`
    color: #ffffff;
`

function ConstructorPopup({ selectedConstructor, showPopup, togglePopup }) {
  const {year} = useParams();
  const { data: standings, isLoading} = useGetConstructorStandingsQuery(year);
  const constructorStandings = standings?.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  const constructorData = constructorStandings?.map(constructor => ({
    id: constructor.Constructor.constructorId,
    wins: constructor.wins,
    points: constructor.points
  }));

  const constructor = constructorData?.find(c => c.id === selectedConstructor?.constructorId);

  return !isLoading && (
    showPopup && selectedConstructor && (
      <div className="popup">
        <h2>{`${selectedConstructor.name}`}</h2>
        <p>Victoires : {constructor.wins}</p>
        <p>Points : {constructor.points}</p>
        <StyledConstructorLink to={`/constructor/${selectedConstructor.constructorId}`}>En savoir plus</StyledConstructorLink>
        <div>
          <button onClick={togglePopup}>Fermer</button>
        </div>
      </div>
    )
  );
}

export default ConstructorPopup;