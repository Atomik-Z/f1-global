import { useState } from 'react';
import { useGetConstructorStandingsQuery } from '../../services/f1Api';
import ConstructorPopup from '../../pages/Constructeurs/ConstructorPopup';
import { useParams } from 'react-router-dom';

function ConstStandings() {
    const {year} = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedConstructor, setselectedConstructor] = useState(null);

    const togglePopup = (constructor) => {
      setShowPopup(!showPopup);
      setselectedConstructor(constructor);
    };

    const { data: standings, isLoading} = useGetConstructorStandingsQuery(year);
    const constructorStandings = standings?.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

  return !isLoading && (
    <div>
      <table class="Constructors">
        <thead>
          <tr>
            <th>Position</th>
            <th>Équipe</th>
            <th>Victoires</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {constructorStandings.map((constructor, index) => (
            <tr key={index}>
              <td>{constructor.position}</td>
              <td onClick={() => togglePopup(constructor.Constructor)} class="constructeur">{constructor.Constructor.name}</td>
              <td>{constructor.wins}</td>
              <td>{constructor.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConstructorPopup selectedConstructor={selectedConstructor} showPopup={showPopup} togglePopup={togglePopup} />
    </div>
  );
}


export default ConstStandings