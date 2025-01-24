import ConstructorRecords from '../../../data/ConstructorRecords.json';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledConstructorLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
`

const seasonRecords = ConstructorRecords.ConstructorRecords.Season;

function ConstructeursSaison () {
    
    return (
        <div>
            <h4>Records du monde constructeurs sur une saison :</h4>
            <ul>
                {seasonRecords.map((record, index) => (
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

export default ConstructeursSaison