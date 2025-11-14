
export interface PredictionInput {
  ticker: string;
  day1Open: string;
  day2Open: string;
  day3Open: string;
  volume: string;
  jobsReport: 'Strong' | 'Weak' | 'Neutral';
}

export interface ChartDataPoint {
  name: string;
  price: number;
}
