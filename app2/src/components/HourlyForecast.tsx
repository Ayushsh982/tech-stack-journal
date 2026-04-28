import React from 'react';
import { HourlyData } from '../types';

interface HourlyForecastProps {
  data: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  return (
    <div className="hourly-section">
      <h3 className="section-title">Hourly Forecast</h3>
      <div className="hourly-scroll">
        {data.map((item, i) => (
          <div className={`hourly-item ${i === 0 ? 'active' : ''}`} key={i}>
            <span className="hourly-hour">{item.hour}</span>
            <span className="hourly-icon">{item.icon}</span>
            <span className="hourly-temp">{item.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
