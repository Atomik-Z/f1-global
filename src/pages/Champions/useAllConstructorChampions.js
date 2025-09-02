// hooks/useAllConstructorChampions.js
import { useEffect, useState } from "react";

export function useAllConstructorChampions() {
  const startYear = 1958;
  const endYear = 2025;
  const [allConstructors, setAllConstructors] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      const constructors = [];
      for (let year = startYear; year <= endYear; year++) {
        const result = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructorStandings/1.json`)
          .then((res) => res.json())
          .catch(() => null);

        const champion = result?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings[0];
        if (champion) {
          constructors.push(champion.Constructor);
        }
      }
      if (isMounted) setAllConstructors(constructors);
    };

    fetchAll();

    return () => { isMounted = false; };
  }, []);

  return allConstructors;
}
