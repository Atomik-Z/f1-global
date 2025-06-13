import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGetCalendrierQuery } from '../../services/f1Api'

const StyledSchedule = styled(Link)`
    padding: 15px;
    margin: 40px;
    color: #ffffff;
    text-decoration: none;
`

const StyledLink = styled(Link)`
    color: #ffffff;
`

function Calendrier({ year }) {
  const { data, error, isLoading } = useGetCalendrierQuery(year);
  const [pastRaces, setPastRaces] = useState([]);
  const [futureRaces, setFutureRaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('future');

  useEffect(() => {
      if (!data) return;

      const currentDate = new Date();

      const races = [...data.MRData.RaceTable.Races];
      const sortedRaces = races.sort((a, b) => new Date(a.date) - new Date(b.date));

      const pastRaces = [];
      const futureRaces = [];

      sortedRaces.forEach(race => {
          const raceDate = new Date(race.date);
          if (raceDate < currentDate) {
              pastRaces.push(race);
          } else {
              futureRaces.push(race);
          }
      });

      setPastRaces(pastRaces);
      setFutureRaces(futureRaces);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
      <div>
          <h2>Calendrier</h2>
          <div>
              <StyledSchedule onClick={() => setSelectedCategory('past')}>Grands Prix passés</StyledSchedule>
              <StyledSchedule onClick={() => setSelectedCategory('future')}>Grands Prix à venir</StyledSchedule>
          </div>
          
          {selectedCategory === 'past' && <h3>Grands Prix déjà eu lieu :</h3>}
          <ul>
              {selectedCategory === 'past' && pastRaces.map((race, index) => (
                  <li key={index} class="Circuit">
                      <strong>{race.raceName}</strong> 
                      <p>Circuit : <StyledLink to={`/circuits/${race.Circuit.circuitId}`}>{race.Circuit.circuitName}</StyledLink></p> 
                      <p>Pays : {race.Circuit.Location.country}</p>
                      <p>Ville : {race.Circuit.Location.locality}</p>
                      <p>Date : {race.date}</p>
                      <StyledLink to={`${race.season}/${index + 1}/results`}>Résultats</StyledLink>
                  </li>
              ))}
          </ul>
          
          {selectedCategory === 'future' && <h3>Grands Prix à venir :</h3>}
          <ul>
              {selectedCategory === 'future' && futureRaces.map((race, index) => (
                  <li key={index} class="Circuit">
                      <strong>{race.raceName}</strong> 
                      <p>Circuit : <StyledLink to={`/circuits/${race.Circuit.circuitId}`}>{race.Circuit.circuitName}</StyledLink></p> 
                      <p>Pays : {race.Circuit.Location.country}</p>
                      <p>Ville : {race.Circuit.Location.locality}</p>
                      <p>Date : {race.date}</p>
                  </li>
              ))}
              {selectedCategory === 'future' && futureRaces.length === 0}
              <li>La saison est terminée</li>
          </ul>
      </div>
  );
}

export default Calendrier;