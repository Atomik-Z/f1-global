import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledRecords = styled(Link)`
    padding: 5px;
    margin: 30px;
    color: #ffffff;
    text-decoration: none;
    font-size: 35px;
`

function Records() {
    return (
        <div>
            <h2>Records du monde en F1</h2>
            <StyledRecords to="pilote">Records du monde pilotes</StyledRecords>
            <StyledRecords to="constructeur">Records du monde constructeurs</StyledRecords>
            <Outlet />
        </div>
    )
}

export default Records