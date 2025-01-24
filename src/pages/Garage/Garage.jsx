import React, { useState } from 'react';
import GarageData from "../../data/GarageData.json";
import { Link } from "react-router-dom";

function Garage() {
    const [filters, setFilters] = useState({
        manufacturer: '',
        engine: '',
        displacement: '',
        champion: ''
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const filterCars = (car) => {
        return (
            (!filters.manufacturer || car.constructeur === filters.manufacturer) &&
            (!filters.engine || car.fiche_technique.moteur === filters.engine) &&
            (!filters.displacement || car.fiche_technique.cylindrée === filters.displacement) &&
            (!filters.champion || car.nom_champion === filters.champion)
        );
    };

    const resetFilters = () => {
        setFilters({
            manufacturer: '',
            engine: '',
            displacement: '',
            champion: ''
        });
    };

    const filteredCars = GarageData.Garage.filter(filterCars);

    const getOptions = (key) => {
        const options = key.includes('.') 
            ? filteredCars.map(car => car[key.split('.')[0]][key.split('.')[1]])
            : filteredCars.map(car => car[key]);
        return [...new Set(options)];
    };

    const manufacturers = getOptions('constructeur');
    const engines = getOptions('fiche_technique.moteur');
    const displacements = getOptions('fiche_technique.cylindrée');
    const champions = getOptions('nom_champion');

    return (
        <div>
            <h2>Garage des champions du monde</h2>

            <div className="filters">
                <select name="manufacturer" value={filters.manufacturer} onChange={handleFilterChange}>
                    <option value="">Tous les constructeurs</option>
                    {manufacturers.map((manufacturer, index) => (
                        <option key={index} value={manufacturer}>{manufacturer}</option>
                    ))}
                </select>

                <select name="engine" value={filters.engine} onChange={handleFilterChange}>
                    <option value="">Tous les moteurs</option>
                    {engines.map((engine, index) => (
                        <option key={index} value={engine}>{engine}</option>
                    ))}
                </select>

                <select name="displacement" value={filters.displacement} onChange={handleFilterChange}>
                    <option value="">Toutes les cylindrées</option>
                    {displacements.map((displacement, index) => (
                        <option key={index} value={displacement}>{displacement}</option>
                    ))}
                </select>

                <select name="champion" value={filters.champion} onChange={handleFilterChange}>
                    <option value="">Tous les champions</option>
                    {champions.map((champion, index) => (
                        <option key={index} value={champion}>{champion}</option>
                    ))}
                </select>
            </div>

            <button onClick={resetFilters}>Réinitialiser les filtres</button>

            {filteredCars.length > 0 ? (
                <ul>
                    {filteredCars.map((car, index) => (
                        <li key={index}>
                            <h4>{`${car.constructeur} ${car.nom}`} :</h4>
                            <p>Année : {car.année}</p>
                            <p>Champion du monde : {car.nom_champion}</p>
                            <p>Victoires : {car.victoires}</p>
                            <Link to={`/${car.nom}`}><img src={car.image} alt={car.nom} className="car" /></Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune voiture ne correspond aux critères de sélection.</p>
            )}
        </div>
    );
}

export default Garage;