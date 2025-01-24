import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDriverRecords = styled(Link)`
    padding: 5px;
    margin: 20px;
    color: #ffffff;
    text-decoration: none;
    font-size: 35px;
`

function RecordsPilotes() {
    return (
        <div>
            <h3>Records du monde pilotes</h3>
            <StyledDriverRecords to="carriere">Records du monde en carrière</StyledDriverRecords>
            <StyledDriverRecords to="saison">Records du monde sur une saison</StyledDriverRecords>
            <Outlet />
        </div>
    )
}

export default RecordsPilotes