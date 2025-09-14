import { useState, useMemo } from "react";
import { useAllConstructorChampions } from "./useAllConstructorChampions";
import { useAllDriverChampions } from "./useAllDriverChampions";

function Champions() {
  const [mode, setMode] = useState("drivers");
  const { allDrivers, loading, error } = useAllDriverChampions();
  const { allConstructors, loading: constructorLoading, error: constructorError } = useAllConstructorChampions();

  const driverStats = useMemo(() => {
    const stats = {};
    allDrivers.forEach(driver => {
      const key = `${driver.givenName} ${driver.familyName}`;
      if (!stats[key]) {
        stats[key] = { 
          name: key, 
          constructors: new Set([driver.constructor]), 
          titles: 1,
          championships: [{ year: driver.year, constructor: driver.constructor }]
        };
      } else {
        stats[key].constructors.add(driver.constructor);
        stats[key].titles += 1;
        stats[key].championships.push({ year: driver.year, constructor: driver.constructor });
      }
    });
    
    // Convert Set to Array and sort championships by year
    return Object.values(stats).map(driver => ({
      ...driver,
      constructors: Array.from(driver.constructors).sort(),
      championships: driver.championships.sort((a, b) => a.year - b.year)
    })).sort((a, b) => b.titles - a.titles);
  }, [allDrivers]);

  const constructorStats = useMemo(() => {
    const stats = {};
    allConstructors.forEach(constructor => {
      const key = constructor.name;
      if (!stats[key]) {
        stats[key] = { 
          name: key, 
          titles: 1,
          championships: [{ 
            year: constructor.year, 
            points: constructor.points, 
            wins: constructor.wins 
          }]
        };
      } else {
        stats[key].titles += 1;
        stats[key].championships.push({ 
          year: constructor.year, 
          points: constructor.points, 
          wins: constructor.wins 
        });
      }
    });
    
    // Sort championships by year for each constructor
    return Object.values(stats).map(constructor => ({
      ...constructor,
      championships: constructor.championships.sort((a, b) => a.year - b.year)
    })).sort((a, b) => b.titles - a.titles);
  }, [allConstructors]);

  if (loading || constructorLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Champions de F1</h2>
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Chargement des données des champions...</p>
      </div>
    );
  }

  if (error || constructorError) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Champions de F1</h2>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#dc3545' }}>
          Erreur lors du chargement des données: {(error || constructorError).message}
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Champions de F1</h2>
      <div style={{ 
        marginBottom: "30px",
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={() => setMode("drivers")}
          style={{
            padding: '10px 20px',
            border: '1px solid',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Pilotes
        </button>
        <button 
          onClick={() => setMode("constructors")}
          style={{
            padding: '10px 20px',
            border: '1px solid',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Constructeurs
        </button>
      </div>

      {mode === "drivers" && (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid' }}>Pilote</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid' }}>Équipes</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid' }}>Nombre de titres</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid' }}>Détails des championnats</th>
            </tr>
          </thead>
          <tbody>
            {driverStats.map((driver, index) => (
              <tr key={index} style={{ borderBottom: '1px solid' }}>
                <td style={{ padding: '12px' }}>{driver.name}</td>
                <td style={{ padding: '12px' }}>
                  {driver.constructors.length > 1 ? (
                    <div>
                      {driver.constructors.map((constructor, idx) => (
                        <div key={idx} style={{ marginBottom: '2px' }}>
                          {constructor}
                        </div>
                      ))}
                    </div>
                  ) : (
                    driver.constructors[0]
                  )}
                </td>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{driver.titles}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontSize: '0.9em' }}>
                    {driver.championships.map((championship, idx) => (
                      <div key={idx} style={{ marginBottom: '1px' }}>
                        {championship.year} - {championship.constructor}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mode === "constructors" && (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid' }}>Constructeur</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid' }}>Nombre de titres</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid' }}>Détails des championnats</th>
            </tr>
          </thead>
          <tbody>
            {constructorStats.map((constructor, index) => (
              <tr key={index} style={{ borderBottom: '1px solid' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{constructor.name}</td>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{constructor.titles}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontSize: '0.9em' }}>
                    {constructor.championships.map((championship, idx) => (
                      <div key={idx} style={{ marginBottom: '1px' }}>
                        {championship.year} - {championship.points} pts - {championship.wins} victoires
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Champions;
