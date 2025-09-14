// hooks/useAllDriverChampionsQuery.js
import { useState, useEffect } from "react";
import driverChampionsData from "../../data/DriverChampions.json";

// Utility function to save data to localStorage (since we can't write to JSON files in browser)
const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('driverChampions', JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

// Utility function to load data from localStorage
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('driverChampions');
    return stored ? JSON.parse(stored) : driverChampionsData;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return driverChampionsData;
  }
};

// Function to fetch a single year's champion
const fetchChampionForYear = async (year) => {
  try {
    const result = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverStandings/1.json`)
      .then(res => res.json());

    const champion = result?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings[0];
    if (champion) {
      return {
        ...champion.Driver,
        constructor: champion.Constructors[0].name,
        year: year,
        points: champion.points,
        wins: champion.wins
      };
    }
  } catch (error) {
    console.warn(`Failed to fetch champion for year ${year}:`, error);
  }
  return null;
};

// Standalone function to fetch all driver champions with smart caching
export async function getAllDriverChampions() {
  const startYear = 1950;
  const endYear = 2024;
  
  // Load existing data from localStorage (fallback to JSON file)
  let existingData = loadFromLocalStorage();
  
  // Create a map of existing years for quick lookup
  const existingYears = new Set(existingData.map(driver => driver.year));
  
  // Find missing years
  const missingYears = [];
  for (let year = startYear; year <= endYear; year++) {
    if (!existingYears.has(year)) {
      missingYears.push(year);
    }
  }
  
  console.log(`Found ${existingData.length} cached champions, fetching ${missingYears.length} missing years:`, missingYears);
  
  // Fetch missing years
  const newChampions = [];
  for (const year of missingYears) {
    const champion = await fetchChampionForYear(year);
    if (champion) {
      newChampions.push(champion);
    }
  }
  
  // Combine existing and new data
  const allChampions = [...existingData, ...newChampions];
  
  // Sort by year
  allChampions.sort((a, b) => a.year - b.year);
  
  // Save updated data to localStorage
  if (newChampions.length > 0) {
    saveToLocalStorage(allChampions);
    console.log(`Added ${newChampions.length} new champions to cache`);
  }
  
  return allChampions;
}

// Function to clear cache (useful for development/testing)
export function clearDriverChampionsCache() {
  localStorage.removeItem('driverChampions');
  console.log('Driver champions cache cleared');
}

// Function to get cached data without API calls
export function getCachedDriverChampions() {
  return loadFromLocalStorage();
}

// React hook version (for use in React components)
export function useAllDriverChampions() {
  const [allDrivers, setAllDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const drivers = await getAllDriverChampions();
        
        if (isMounted) {
          setAllDrivers(drivers);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => { isMounted = false };
  }, []);

  return { allDrivers, loading, error };
}
