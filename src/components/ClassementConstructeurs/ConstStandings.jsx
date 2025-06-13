import { useState } from 'react';
import { useGetConstructorStandingsQuery } from '../../services/f1Api';
import ConstructorPopup from '../../pages/Constructeurs/ConstructorPopup';
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
      <table className="Constructors">
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
            <AnimatedTableRow key={index} index={index}>
              <td>{constructor.position}</td>
              <td onClick={() => togglePopup(constructor.Constructor)} className="constructeur">{constructor.Constructor.name}</td>
              <td>{constructor.wins}</td>
              <td>{constructor.points}</td>
            </AnimatedTableRow>
          ))}
        </tbody>
      </table>
      <ConstructorPopup selectedConstructor={selectedConstructor} showPopup={showPopup} togglePopup={togglePopup} />
    </div>
  );
}


export default ConstStandings
