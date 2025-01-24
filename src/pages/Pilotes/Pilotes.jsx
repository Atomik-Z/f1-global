
import { useState, useEffect } from 'react';
import InfoPilote from './InfoPilote';
  
  function Pilotes() {
    const [idPilote, setidPilote] = useState([]);
  
    useEffect(() => {
      fetch('http://ergast.com/api/f1/2024/drivers.json')
        .then(response => response.json())
        .then(data => {
          const ids = data.MRData.DriverTable.Drivers.map(driver => driver.driverId);
          setidPilote(ids);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    return (
      <div class="ListePilotes">
        {idPilote.map(driverId => (
          <InfoPilote key={driverId} driverId={driverId} />
        ))}
      </div>
    );
  }

export default Pilotes