import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledConstructorRecords = styled(Link)`
    padding: 5px;
    margin: 20px;
    color: #ffffff;
    text-decoration: none;
    font-size: 35px;
`

function RecordsPilotes() {
    return (
        <div>
            <h3>Records du monde constructeurs</h3>
            <StyledConstructorRecords to="carriere">Records du monde en carrière</StyledConstructorRecords>
            <StyledConstructorRecords to="saison">Records du monde sur une saison</StyledConstructorRecords>
            <Outlet />
        </div>
    )
}

export default RecordsPilotes