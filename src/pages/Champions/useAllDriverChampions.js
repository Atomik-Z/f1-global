// hooks/useAllDriverChampionsQuery.js
import { useState, useEffect } from "react";

export function useAllDriverChampions() {
  const startYear = 1950;
  const endYear = 2025;
  const [allDrivers, setAllDrivers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      const drivers = [];

      for (let year = startYear; year <= endYear; year++) {
        // Ici on utilise le hook query de façon "fonctionnelle"
        // Comme RTK Query expose fetchBaseQuery, on peut faire un fetch manuel
        const result = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverStandings/1.json`)
          .then(res => res.json())
          .catch(() => null);

        const champion = result?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings[0];
        if (champion) {
          drivers.push({ ...champion.Driver, constructor: champion.Constructors[0].name });
        }
      }

      if (isMounted) setAllDrivers(drivers);
    };

    fetchAll();

    return () => { isMounted = false };
  }, []);

  return allDrivers;
}

