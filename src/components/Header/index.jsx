import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between; /* logo à gauche, liens à droite */
    align-items: center;
    height: 150px;
    padding: 0 40px; /* espace interne à gauche et à droite */
    background-color: #ff0000; /* bande rouge */
    box-sizing: border-box;
    margin-left: -21.4%;
    margin-right: -21.4%;
`

const StyledLogo = styled(Link)`
    color: #ffffff;
    text-decoration: none;
    font-size: 30px;
    position: relative;
    display: inline-block;

    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        right: 0;
        background-color: #ffffff;
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
        left: 0;
        right: auto;
    }
`

const LinksContainer = styled.div`
    display: flex;
    gap: 20px; /* réduit l'espacement entre les liens */
    background-color: inherit; /* hérite du rouge du parent */
`

const StyledLink = styled(Link)`
    display: inline-block;
    color: #ffffff;
    text-decoration: none;
    font-size: 24px;
    position: relative;
    background-color: transparent;

    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        right: 0;
        background-color: #ffffff;
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
        left: 0;
        right: auto;
    }
`

function Header() {
    return (
        <StyledNav>
            <StyledLogo to="/">Accueil</StyledLogo>
            <LinksContainer>
                <StyledLink to="/classements">Classements</StyledLink>
                <StyledLink to="/calendrier">Calendrier</StyledLink>
                <StyledLink to="/garage">Garage</StyledLink>
                <StyledLink to="/records">Records</StyledLink>
                <StyledLink to="/lexique">Lexique</StyledLink>
                <StyledLink to="/champions">Champions</StyledLink>
            </LinksContainer>
        </StyledNav>
    )
}

export default Header


