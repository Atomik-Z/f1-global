import React, { useState, useEffect } from 'react';

function WinCount({ driverId }) {
  const [totalWins, setTotalWins] = useState(0);

  useEffect(() => {
    async function fetchTotalWins() {
      try {
        const WinCounts = await Promise.all([fetchWinCount(driverId, '1')]);
        const total = WinCounts.reduce((total, count) => total + parseInt(count), 0);
        setTotalWins(total);
      } catch (error) {
        console.error('Error fetching Win counts:', error);
      }
    }

    fetchTotalWins();
  }, [driverId]);

  async function fetchWinCount(driverId, position) {
    try {
      const response = await fetch(`https://ergast.com/api/f1/drivers/${driverId}/results/${position}.json`);
      const data = await response.json();
      return data.MRData.total;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 0;
    }
  }

  return (
      <p>Victoires : {totalWins}</p>
  );
}

export default WinCount;