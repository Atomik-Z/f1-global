import PodiumCount from './PodiumCount';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDriverCareerWinsQuery, useGetDriverQuery } from '../../services/f1Api';

function InfoPilote() {
    const { driverId } = useParams();
    const { data: infoPilote, isLoading} = useGetDriverQuery(driverId);
    const { data: victoiresPilote } = useGetDriverCareerWinsQuery(driverId);
    const [additionalInfo, setAdditionalInfo] = useState(null);

    useEffect(() => {
      if (infoPilote && infoPilote.MRData.DriverTable.Drivers.length > 0) {
        const fullName = `${infoPilote.MRData.DriverTable.Drivers[0].givenName} ${infoPilote.MRData.DriverTable.Drivers[0].familyName}`;
        fetch(`https://v1.formula-1.api-sports.io/drivers?search=${encodeURIComponent(fullName)}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-rapidapi-key": "671c6d18eb9b7234724a42d9e2bcdd2b"
          }
        })
          .then(response => response.json())
          .then(donnee => setAdditionalInfo(donnee.response[0]))
          .catch(error => console.error('Error fetching additional driver info:', error));
      }
    }, [infoPilote]);
  
    return !isLoading && (
      <div class="Pilote">
        <h3 id={driverId}>{infoPilote?.MRData.DriverTable.Drivers[0].givenName} {infoPilote?.MRData.DriverTable.Drivers[0].familyName}</h3>
        {additionalInfo?.image && <img src={additionalInfo.image} alt={driverId} class="driverImage"/>}
        <p>Nationalité : {infoPilote?.MRData.DriverTable.Drivers[0].nationality}</p>
        <p>Date de naissance : {infoPilote?.MRData.DriverTable.Drivers[0].dateOfBirth}</p>
        {additionalInfo?.world_championships && <p>Titres de Champion du Monde : {additionalInfo.world_championships}</p>}
        {infoPilote?.MRData.DriverTable.Drivers[0].permanentNumber && <p>Numéro de course : {infoPilote?.MRData.DriverTable.Drivers[0].permanentNumber}</p>}
        {additionalInfo?.grands_prix_entered && <p>Nombre de Grands Prix courus : {additionalInfo.grands_prix_entered}</p>}
        <p>Victoires : {victoiresPilote?.MRData.total}</p>
        <PodiumCount driverId={driverId} />
        {additionalInfo?.career_points && <p>Points inscrits en carrière : {additionalInfo.career_points}</p>}
      </div>
    );
  }

export default InfoPilote;