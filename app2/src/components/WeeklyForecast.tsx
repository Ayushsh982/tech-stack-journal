import React from 'react';
import { DailyData } from '../types';

interface WeeklyForecastProps {
  data: DailyData[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {
  const maxHigh = Math.max(...data.map(d => d.high));
  const minLow = Math.min(...data.map(d => d.low));

  return (
    <div className="weekly-section">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="weekly-list">
        {data.map((day, i) => {
          const highPct = ((day.high - minLow) / (maxHigh - minLow)) * 100;
          const lowPct = ((day.low - minLow) / (maxHigh - minLow)) * 100;
          return (
            <div className={`weekly-row ${i === 0 ? 'active' : ''}`} key={i}>
              <span className="weekly-day">{day.day}</span>
              <span className="weekly-icon">{day.icon}</span>
              <span className="weekly-condition">{day.condition}</span>
              <div className="weekly-bar-wrap">
                <span className="weekly-low">{day.low}°</span>
                <div className="weekly-bar">
                  <div
                    className="weekly-bar-fill"
                    style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
                  />
                </div>
                <span className="weekly-high">{day.high}°</span>
              </div>
              <div className="rain-chance">
                <span className="rain-icon">💧</span>
                <span className="rain-pct">{day.rain}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
