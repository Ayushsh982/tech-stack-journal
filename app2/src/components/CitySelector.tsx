import React from 'react';
import { City } from '../types';

interface CitySelectorProps {
  cities: City[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities, selectedIndex, onSelect }) => {
  return (
    <div className="city-selector">
      {cities.map((city, i) => (
        <button
          key={city.name}
          className={`city-btn ${selectedIndex === i ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        >
          <span className="city-btn-icon">{city.current.icon}</span>
          <span className="city-btn-name">{city.name}</span>
          <span className="city-btn-temp">{city.current.temp}°</span>
        </button>
      ))}
    </div>
  );
};

export default CitySelector;
