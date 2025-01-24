import DriverRecords from '../../../data/DriverRecords.json';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const careerRecords = DriverRecords.DriverRecords.Career;

const StyledDriverLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
`

function PilotesCarriere () {
    
    return (
        <div>
            <h4>Records du monde pilotes en carrière :</h4>
            <ul>
                {careerRecords.map((record, index) => (
                    <li key={index}>
                        <strong>{record.name}</strong>
                        {record.driver.map((driver, number) => (
                            <div key={number}>
                                <p><StyledDriverLink to={`/driver/${driver.driverId}`}>{driver.fullName}</StyledDriverLink> : {record.value && record.value}</p>
                                {record.age && <p>{record.age}</p>}
                                {driver.race && <p>{driver.race}</p>}
                                {driver.position && <p>{driver.position}</p>}
                                {driver.year && <p>{driver.year}</p>}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PilotesCarriere