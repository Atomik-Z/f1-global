import React, { useState, useEffect } from 'react';

function ConstWinCount({ constructorId }) {
  const [totalWins, setTotalWins] = useState(0);

  useEffect(() => {
    async function fetchTotalWins() {
      try {
        const ConstWinCounts = await Promise.all([fetchConstWinCount(constructorId, '1')]);
        const total = ConstWinCounts.reduce((total, count) => total + parseInt(count), 0);
        setTotalWins(total);
      } catch (error) {
        console.error('Error fetching Win counts:', error);
      }
    }

    fetchTotalWins();
  }, [constructorId]);

  async function fetchConstWinCount(constructorId, position) {
    try {
      const response = await fetch(`https://ergast.com/api/f1/constructors/${constructorId}/results/${position}.json`);
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

export default ConstWinCount;