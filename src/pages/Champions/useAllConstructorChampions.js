// hooks/useAllConstructorChampions.js
import { useEffect, useState } from "react";

export function useAllConstructorChampions() {
  const startYear = 1958;
  const endYear = 2024;
  const [allConstructors, setAllConstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const constructors = [];
        for (let year = startYear; year <= endYear; year++) {
          const result = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructorStandings/1.json`)
            .then((res) => res.json())
            .catch(() => null);

          const champion = result?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings[0];
          if (champion) {
            constructors.push({
              ...champion.Constructor,
              year: year,
              points: champion.points,
              wins: champion.wins
            });
          }
        }
        if (isMounted) {
          setAllConstructors(constructors);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => { isMounted = false; };
  }, []);

  return { allConstructors, loading, error };
}
