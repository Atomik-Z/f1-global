import DriverRecords from '../../../data/DriverRecords.json';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const seasonRecords = DriverRecords.DriverRecords.Season;

const StyledDriverLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
`

function PilotesSaison () {
    
    return (
        <div>
            <h4>Records du monde pilotes sur une saison :</h4>
            <ul>
                {seasonRecords.map((record, index) => (
                    <li key={index}>
                        <strong>{record.name}</strong>
                        {record.driver.map((driver, number) => (
                            <div key={number}>
                                <p><StyledDriverLink to={`/driver/${driver.driverId}`}>{driver.fullName}</StyledDriverLink> : {record.value}</p>
                                <p>{driver.year}</p>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PilotesSaison