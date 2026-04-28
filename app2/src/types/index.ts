export interface WeatherCondition {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  visibility: number;
  condition: string;
  icon: string;
  uv: number;
  pressure: number;
}

export interface HourlyData {
  hour: string;
  temp: number;
  icon: string;
}

export interface DailyData {
  day: string;
  high: number;
  low: number;
  icon: string;
  condition: string;
  rain: number;
}

export interface City {
  name: string;
  country: string;
  timezone: string;
  current: WeatherCondition;
  hourly: HourlyData[];
  weekly: DailyData[];
}
