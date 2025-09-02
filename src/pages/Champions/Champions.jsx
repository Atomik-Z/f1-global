import { useState, useMemo } from "react";
import { useAllConstructorChampions } from "./useAllConstructorChampions";
import { useAllDriverChampions } from "./useAllDriverChampions";

function Champions() {
  const [mode, setMode] = useState("drivers");
  const allDrivers = useAllDriverChampions();
  const allConstructors = useAllConstructorChampions();

  const driverStats = useMemo(() => {
    const stats = {};
    allDrivers.forEach(driver => {
      const key = `${driver.givenName} ${driver.familyName}`;
      if (!stats[key]) {
        stats[key] = { name: key, constructor: driver.constructor, titles: 1 };
      } else {
        stats[key].titles += 1;
      }
    });
    return Object.values(stats).sort((a, b) => b.titles - a.titles);
  }, [allDrivers]);

  const constructorStats = useMemo(() => {
    const stats = {};
    allConstructors.forEach(constructor => {
      const key = constructor.name;
      if (!stats[key]) stats[key] = { name: key, titles: 1 };
      else stats[key].titles += 1;
    });
    return Object.values(stats).sort((a, b) => b.titles - a.titles);
  }, [allConstructors]);

  return (
    <div>
      <h2>Champions de F1</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMode("drivers")}>Pilotes</button>
        <button onClick={() => setMode("constructors")}>Constructeurs</button>
      </div>

      {mode === "drivers" && (
        <table>
          <thead>
            <tr>
              <th>Pilote</th>
              <th>Équipe</th>
              <th>Nombre de titres</th>
            </tr>
          </thead>
          <tbody>
            {driverStats.map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.constructor}</td>
                <td>{driver.titles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mode === "constructors" && (
        <table>
          <thead>
            <tr>
              <th>Constructeur</th>
              <th>Nombre de titres</th>
            </tr>
          </thead>
          <tbody>
            {constructorStats.map((constructor, index) => (
              <tr key={index}>
                <td>{constructor.name}</td>
                <td>{constructor.titles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Champions;




