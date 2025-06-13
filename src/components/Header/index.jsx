import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    padding: 15px;
    color: #ffffff;
    text-decoration: none;
    font-size: 30px;
    margin: 40px;
    position: relative;
    
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

const StyledLogo = styled(Link)`
    padding: 15px;
    color: #ffffff;
    text-decoration: none;
    font-size: 30px;
    margin: 40px;
    display: left;
    position: relative;
    
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

const StyledNav = styled.nav`
    display: flex;
    justify-content: flex-end;
    height: 150px;
    margin-left: -21.4%;
    margin-right: -21.4%;
    margin-top: 0;
    padding: 0;
    text-align: right;
    background-color: #ff0000;
`


function Header() {
    return (
        <StyledNav>
            <StyledLogo to="/">Accueil</StyledLogo>
            <StyledLink to="/classements">Classements</StyledLink>
            <StyledLink to="/calendrier">Calendrier</StyledLink>
            <StyledLink to="/garage">Garage</StyledLink>
            <StyledLink to="/records">Records</StyledLink>
            <StyledLink to="/lexique">Lexique</StyledLink>
        </StyledNav>
    )
}

export default Header
