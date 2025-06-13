import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledStandings = styled(Link)`
    padding: 15px;
    margin: 40px;
    color: #ffffff;
    text-decoration: none;
`;

function Classements() {
    const [selectedYear, setSelectedYear] = useState(2025);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
    };

    const generateYearOptions = () => {
        const years = [];
        for (let year = 1950; year <= 2025; year++) {
            years.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return years;
    };

    return (
        <div>
            <h2>Classements</h2>
            <div className="yearList">
                <label htmlFor="year-select">Choisir l'année :</label>
                <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                    {generateYearOptions()}
                </select>
            </div>
            <StyledStandings to={`/classements/${selectedYear}/pilotes`}>Classement pilotes</StyledStandings>
            <StyledStandings to={`/classements/${selectedYear}/constructeurs`}>Classement constructeurs</StyledStandings>
            <Outlet />
        </div>
    );
}

export default Classements;
