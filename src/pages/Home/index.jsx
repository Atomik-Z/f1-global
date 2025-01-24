import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGetDriverStandingsQuery, useGetConstructorStandingsQuery, useGetLastRaceResultsQuery, useGetCalendrierQuery } from '../../services/f1Api';
import ArticleList from '../../data/ArticleList.json';
import { useState, useEffect } from 'react';

const StyledLink = styled(Link)`
    padding: 15px;
    color: #ffffff;
    text-decoration: none;
    font-size:30px;
    margin: 40px;
`


function App() {
  const { data: lastResults, isLoading } = useGetLastRaceResultsQuery();
  const { data: driverStandings } = useGetDriverStandingsQuery('2024');
  const { data: constructorStandings } = useGetConstructorStandingsQuery('2024');
  const { data: calendarData } = useGetCalendrierQuery('2024');

  const [nextRaceDate, setNextRaceDate] = useState(null);
  const [nextRaceName, setNextRaceName] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (calendarData) {
      const currentDate = new Date();
      const races = calendarData.MRData.RaceTable.Races;
      const nextRace = races.find(race => new Date(`${race.date}T${race.time}`) > currentDate);

      if (nextRace) {
        setNextRaceDate(new Date(`${nextRace.date}T${nextRace.time}`));
        setNextRaceName(nextRace.raceName);
      }
    }
  }, [calendarData]);

  useEffect(() => {
    if (nextRaceDate) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const timeDifference = nextRaceDate - now;

        if (timeDifference <= 0) {
          setTimeLeft('Grand Prix en cours ou terminé');
          clearInterval(intervalId);
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);

          setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [nextRaceDate]);

  const topThreeDrivers = driverStandings?.MRData.StandingsTable.StandingsLists[0]?.DriverStandings.slice(0, 3).map(driver => ({
    name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    position: driver.position,
    points: driver.points,
  }));
  const topThreeConstructors = constructorStandings?.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings.slice(0, 3).map(constructor => ({
    name: constructor.Constructor.name,
    position: constructor.position,
    points: constructor.points,
  }));

  const raceTopThree = lastResults?.MRData.RaceTable.Races[0]?.Results.slice(0, 3).map(driver => ({
    name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    position: driver.position,
  }));

  const fiveArticles = ArticleList.ArticleList.map(article => ({
    titre: article.titre,
    type: article.type,
    idArticle: article.idArticle,
  }));

  return !isLoading && (
    <div className="App">
      <header className="App-header">
        <p>
            <ul>
              <div class="lastResults">
                <h4 class="homeTitle">Top 3 du dernier Grand Prix</h4>
                <strong>{lastResults?.MRData.RaceTable.Races[0]?.raceName} :</strong>
                <ul>
                  {raceTopThree.map((driver, index) => (
                    <li key={index}>
                      {driver.position} - {driver.name}
                    </li>
                  ))}
                </ul>
                <StyledLink to="/latest/results">Détail des résultats</StyledLink>
              </div>
              <div class="calendar">
                <h4 class="homeTitle">Temps restant avant le prochain Grand Prix : </h4>
                {nextRaceDate && <p>{nextRaceName} : {timeLeft}</p>}
                <StyledLink to="/calendrier">Voir le calendrier</StyledLink>
              </div>
             </ul>
        </p>
        <p>
            <ul>
            <div class="championship">
              <h4 class="homeTitle">Top 3 des pilotes</h4>
                <ul>
                  {topThreeDrivers.map((driver, index) => (
                  <li key={index}>
                     {driver.position} - {driver.name} - {driver.points} pts
                  </li>
                  ))}
                </ul>
            </div>
            <div>
              <h4 class="homeTitle">Top 3 des constructeurs</h4>
                <ul>
                  {topThreeConstructors.map((constructor, index) => (
                  <li key={index}>
                     {constructor.position} - {constructor.name} - {constructor.points} pts
                  </li>
                  ))}
                </ul>
            </div>
              <StyledLink to="/classements">Détails des classements</StyledLink>
          </ul>
        </p>
        <div class="ArticleList">
          <h4 class="homeTitle">Articles récents</h4>
          <ul>
            {fiveArticles.map((article, index) => (
              <li key={index}>
                <p class="articleType">{article.type}</p>
                <StyledLink to={`/article/${article.idArticle}`}>{article.titre}</StyledLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
