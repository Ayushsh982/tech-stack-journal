import React from 'react';
import { WeatherCondition } from '../types';

interface WeatherMetricsProps {
  data: WeatherCondition;
}

const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ data }) => {
  const metrics = [
    { label: 'Feels Like', value: `${data.feelsLike}°C`, icon: '🌡️' },
    { label: 'Humidity', value: `${data.humidity}%`, icon: '💧' },
    { label: 'Wind Speed', value: `${data.wind} km/h`, icon: '💨' },
    { label: 'Visibility', value: `${data.visibility} km`, icon: '👁️' },
    { label: 'UV Index', value: String(data.uv), icon: '☀️' },
    { label: 'Pressure', value: `${data.pressure} hPa`, icon: '🔵' },
  ];

  const getUvLabel = (uv: number) => {
    if (uv <= 2) return { label: 'Low', color: '#4ade80' };
    if (uv <= 5) return { label: 'Moderate', color: '#facc15' };
    if (uv <= 7) return { label: 'High', color: '#fb923c' };
    return { label: 'Very High', color: '#f43f5e' };
  };

  const uvInfo = getUvLabel(data.uv);

  return (
    <div className="metrics-section">
      <h3 className="section-title">Conditions</h3>
      <div className="metrics-grid">
        {metrics.map((m, i) => (
          <div className="metric-card" key={i}>
            <span className="metric-icon">{m.icon}</span>
            <div className="metric-info">
              <span className="metric-label">{m.label}</span>
              <span
                className="metric-value"
                style={m.label === 'UV Index' ? { color: uvInfo.color } : {}}
              >
                {m.value}
                {m.label === 'UV Index' && (
                  <span className="uv-label" style={{ color: uvInfo.color }}>
                    {' '}{uvInfo.label}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherMetrics;
