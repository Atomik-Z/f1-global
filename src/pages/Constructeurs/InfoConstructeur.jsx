import { useState, useEffect } from 'react';
import ConstPodiumCount from './ConstPodiumCount';
import { useParams } from 'react-router-dom';
import { useGetConstructorQuery, useGetConstructorCareerWinsQuery } from '../../services/f1Api';

function InfoConstructeur() {
    const { constructorId } = useParams();
    const { data: infoConstructeur, isLoading } = useGetConstructorQuery(constructorId);
    const { data: victoiresConstructeur } = useGetConstructorCareerWinsQuery(constructorId);

    const [additionalInfo, setAdditionalInfo] = useState(null);

    useEffect(() => {
      if (infoConstructeur && infoConstructeur.MRData.ConstructorTable.Constructors.length > 0) {
        const fullName = `${infoConstructeur.MRData.ConstructorTable.Constructors[0].name}`;
        fetch(`https://v1.formula-1.api-sports.io/teams?search=${encodeURIComponent(fullName)}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-rapidapi-key": "671c6d18eb9b7234724a42d9e2bcdd2b"
          }
        })
          .then(response => response.json())
          .then(donnee => setAdditionalInfo(donnee.response[0]))
          .catch(error => console.error('Error fetching additional constructor info:', error));
      }
    }, [infoConstructeur]);
  
    return !isLoading && (
      <div class="Constructeur">
        <h3 id={constructorId}>{infoConstructeur?.MRData.ConstructorTable.Constructors[0].name}</h3>
        {additionalInfo?.logo && <img src={additionalInfo.logo} alt={constructorId} class="constructorImage"/>}
        <p>Nationalité : {infoConstructeur?.MRData.ConstructorTable.Constructors[0].nationality}</p>
        {additionalInfo?.base && <p>Quartier général de l'écurie : {additionalInfo.base}</p>}
        {additionalInfo?.world_championships && <p>Titres de Champion du Monde : {additionalInfo.world_championships}</p>}
        {additionalInfo?.director && <p>Directeur d'écurie : {additionalInfo.director}</p>}
        {additionalInfo?.technical_manager && <p>Directeur technique : {additionalInfo.technical_manager}</p>}
        <p>Victoires : {victoiresConstructeur?.MRData.total}</p>
        <ConstPodiumCount constructorId={constructorId} />
        {additionalInfo?.pole_positions && <p>Pole positions : {additionalInfo.pole_positions}</p>}
        {additionalInfo?.fastest_laps && <p>Meilleurs tours en course : {additionalInfo.fastest_laps}</p>}
      </div>
    );
  }

export default InfoConstructeur;