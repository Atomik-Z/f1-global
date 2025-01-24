import { useParams } from "react-router-dom";
import GarageData from "../../data/GarageData.json"
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDriverLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
`

function InfoVoiture() {
    const { car } = useParams();

    const currentCar = GarageData.Garage.find(g => g.nom === car);
    return (
        <div class="Voiture">
            <h3 id={currentCar.nom}>{currentCar.constructeur} {currentCar.nom}</h3>
            <img src={currentCar.image} alt={currentCar.nom} class="car" />
            <p>Année : {currentCar.année}</p>
            <p>Champion du monde : {currentCar.nom_champion}</p>
            <div>
                <h4>Fiche technique :</h4>
                <p>Moteur : {currentCar.fiche_technique.moteur}</p>
                <p>Cylindrée : {currentCar.fiche_technique.cylindrée}</p>
                <p>Régime moteur maximum : {currentCar.fiche_technique.max_rpm}</p>
                <p>Puissance : {currentCar.fiche_technique.puissance}</p>
                <p>Boîte de Vitesses : {currentCar.fiche_technique.gearbox}</p>
                <p>Carburant : {currentCar.fiche_technique.carburant}</p>
                <p>Poids : {currentCar.fiche_technique.poids}</p>
                <p>Pneus : {currentCar.fiche_technique.pneus}</p>
            </div>
            <div>
                <h4>Palmarès de la saison {currentCar.année} :</h4>
                <div>
                    <strong>Pilotes :</strong>
                    <p>{currentCar.statistiques.pilotes.map((pilote, index) => (
                        <StyledDriverLink to={`/driver/${currentCar.statistiques.idPilotes[index]}`} key={index}>{pilote}, </StyledDriverLink>
                    ))}</p>
                </div>
                <p>Victoires : {currentCar.victoires}</p>
                <p>Podiums : {currentCar.statistiques.podiums}</p>
                <p>Meilleurs tours : {currentCar.statistiques.fastest_laps}</p>
                <p>Pole positions : {currentCar.statistiques.poles}</p>
                <p>Abandons : {currentCar.statistiques.abandons}</p>
            </div>
      </div>
    )
}

export default InfoVoiture
