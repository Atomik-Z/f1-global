import { useState, useEffect } from "react";


function DriverDetails({driverId, season}) {
  const [totalSeasonPodiums, setTotalSeasonPodiums] = useState(0);

  useEffect(() => {
    async function fetchTotalSeasonPodiums() {
      try {
        const podiumCounts = await Promise.all([fetchPodiumCount(driverId, '1'), fetchPodiumCount(driverId, '2'), fetchPodiumCount(driverId, '3')]);
        const total = podiumCounts.reduce((total, count) => total + parseInt(count), 0);
        setTotalSeasonPodiums(total);
      } catch (error) {
        console.error('Error fetching podium counts:', error);
      }
    }

    fetchTotalSeasonPodiums();
  }, [driverId]);

  async function fetchPodiumCount(driverId, position) {
    try {
      const response = await fetch(`https://ergast.com/api/f1/${season}/drivers/${driverId}/results/${position}.json`);
      const data = await response.json();
      return data.MRData.total;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 0;
    }
  }

  return (
      <p>Podiums : {totalSeasonPodiums}</p>
  );
}

export default DriverDetails