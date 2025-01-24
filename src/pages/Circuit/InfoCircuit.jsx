import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetCircuitInfoQuery } from '../../services/f1Api';
import exceptions from "./CircuitExceptionList.json";

function InfoCircuit() {
    const { circuitId } = useParams();
    const { data: infoCircuit, isLoading} = useGetCircuitInfoQuery(circuitId);

    const [additionalInfo, setAdditionalInfo] = useState(null);

    const getApiSportsName = (circuitId) => {
      const exception = exceptions.ExceptionList.find(item => item.idErgast === circuitId);
      return exception ? exception.nameApiSports : null;
  };

  useEffect(() => {
    const fetchAdditionalInfo = async (searchName) => {
      try {
        const response = await fetch(`https://v1.formula-1.api-sports.io/circuits?search=${encodeURIComponent(searchName)}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-rapidapi-key": "671c6d18eb9b7234724a42d9e2bcdd2b"
          }
        });
        const donnee = await response.json();
        setAdditionalInfo(donnee.response[0]);
      } catch (error) {
        console.error('Error fetching additional circuit info:', error);
      }
    };

    if (infoCircuit && infoCircuit.MRData.CircuitTable.Circuits.length > 0) {
      const apiSportsName = getApiSportsName(circuitId) || infoCircuit.MRData.CircuitTable.Circuits[0].circuitName;
      fetchAdditionalInfo(apiSportsName);
    }
  }, [infoCircuit, circuitId]);

  
  
    return !isLoading && (
      <div class="Circuit">
        <h3 id={circuitId}>{infoCircuit?.MRData.CircuitTable.Circuits[0].circuitName}</h3>
        {additionalInfo?.image && <img src={additionalInfo.image} alt={circuitId} class="circuitImage"/>}
        <p>Ville : {infoCircuit?.MRData.CircuitTable.Circuits[0].Location.locality}</p>
        <p>Pays : {infoCircuit?.MRData.CircuitTable.Circuits[0].Location.country}</p>
        {additionalInfo?.length && <p>Longueur : {additionalInfo?.length}</p>}
        {additionalInfo?.lap_record && <p>Record du tour : {additionalInfo?.lap_record.time} - {additionalInfo?.lap_record.driver} ({additionalInfo?.lap_record.year})</p>}
        {additionalInfo?.first_grand_prix && <p>Année du premier Grand Prix : {additionalInfo?.first_grand_prix}</p>}
        {additionalInfo?.laps && <p>Nombre de tours : {additionalInfo?.laps}</p>}
        {additionalInfo?.race_distance && <p>Distance de course totale : {additionalInfo?.race_distance}</p>}
        <p>Pilote le plus victorieux :</p>
      </div>
    );
  }

export default InfoCircuit;