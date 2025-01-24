import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`

const CardImage = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`

function Card({ label, title, picture }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 15 }}>
            <span>{title}</span>
            <CardImage src={picture} alt="pilote"/>
            <CardLabel>{label}</CardLabel>
        </div>
    )
}

Card.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
}

export default Card