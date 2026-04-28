import React, { useState } from 'react';
import { CITIES } from './data/mockData';
import CitySelector from './components/CitySelector';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherMetrics from './components/WeatherMetrics';
import './App.css';

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const city = CITIES[selectedIndex];

  const getBgGradient = (condition: string): string => {
    const c = condition.toLowerCase();
    if (c.includes('sun') || c.includes('clear') || c.includes('hot'))
      return 'linear-gradient(160deg, #1a3a5c 0%, #0d5fa5 50%, #1e90d6 100%)';
    if (c.includes('rain') || c.includes('shower') || c.includes('storm'))
      return 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    if (c.includes('cloud') || c.includes('over') || c.includes('hazy'))
      return 'linear-gradient(160deg, #2d3561 0%, #1a2340 50%, #0f172a 100%)';
    return 'linear-gradient(160deg, #1e3a5f 0%, #0d2137 50%, #071626 100%)';
  };

  return (
    <div className="app" style={{ background: getBgGradient(city.current.condition) }}>
      {/* Ambient blobs */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />

      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="brand">
            <span className="brand-icon">🌐</span>
            <div>
              <p className="brand-name">WeatherScope</p>
              <p className="brand-sub">App 2 · Live Forecast</p>
            </div>
          </div>
          <CitySelector cities={CITIES} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          <div className="sidebar-footer">
            <p className="sidebar-note">📡 Data simulated · Demo mode</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Hero */}
          <div className="hero">
            <div className="hero-left">
              <div className="city-name-row">
                <h1 className="city-name">{city.name}</h1>
                <span className="country-badge">{city.country}</span>
              </div>
              <p className="city-condition">{city.current.condition}</p>
              <div className="temp-display">
                <span className="temp-big">{city.current.temp}</span>
                <span className="temp-unit">°C</span>
              </div>
              <p className="timezone-tag">🕐 {city.timezone}</p>
            </div>
            <div className="hero-right">
              <div className="weather-icon-hero">{city.current.icon}</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            <div className="col-left">
              <HourlyForecast data={city.hourly} />
              <WeatherMetrics data={city.current} />
            </div>
            <div className="col-right">
              <WeeklyForecast data={city.weekly} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
