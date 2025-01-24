import ConstructorRecords from '../../../data/ConstructorRecords.json';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledConstructorLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
`

const careerRecords = ConstructorRecords.ConstructorRecords.Career;

function ConstructeursCarriere () {
    
    return (
        <div>
            <h4>Records du monde constructeurs en carrière :</h4>
            <ul>
                {careerRecords.map((record, index) => (
                    <li key={index}>
                        <strong>{record.name}</strong>
                        {record.constructor.map((constructor, number) => (
                            <div key={number}>
                                <p><StyledConstructorLink to={`/constructor/${constructor.constructorId}`}>{constructor.fullName}</StyledConstructorLink> : {record.value}</p>
                                {constructor.year && <p>{constructor.year}</p>}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ConstructeursCarriere