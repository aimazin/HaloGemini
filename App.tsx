
import React, { useState, useCallback } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { PriceChart } from './components/PriceChart';
import { getPricePrediction } from './services/geminiService';
import type { PredictionInput, ChartDataPoint } from './types';
import { LogoIcon, LoadingSpinnerIcon, AlertTriangleIcon, DollarSignIcon } from './components/icons';

const App: React.FC = () => {
  const [formState, setFormState] = useState<PredictionInput>({
    ticker: 'GOOGL',
    day1Open: '175.50',
    day2Open: '176.20',
    day3Open: '177.10',
    volume: '25.5M',
    jobsReport: 'Strong',
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setChartData([]);

    try {
      const predictedPrice = await getPricePrediction(formState);
      setPrediction(predictedPrice);
      
      const newChartData: ChartDataPoint[] = [
        { name: 'Day 1 Open', price: parseFloat(formState.day1Open) },
        { name: 'Day 2 Open', price: parseFloat(formState.day2Open) },
        { name: 'Day 3 Open', price: parseFloat(formState.day3Open) },
        { name: 'Predicted Close', price: predictedPrice },
      ];
      setChartData(newChartData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center space-x-3 mb-8">
          <LogoIcon className="h-10 w-10 text-cyan-400" />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Gemini Asset Predictor
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-1 text-cyan-300">Prediction Model Inputs</h2>
              <p className="text-sm text-gray-400 mb-6">Provide asset data to forecast the next closing price.</p>
              <PredictionForm
                formState={formState}
                handleFormChange={handleFormChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700 min-h-[480px] flex flex-col justify-center items-center">
              {isLoading && (
                <div className="flex flex-col items-center text-center text-gray-400">
                  <LoadingSpinnerIcon className="h-12 w-12 mb-4" />
                  <p className="font-semibold text-lg text-gray-300">Analyzing Market Data...</p>
                  <p className="text-sm">Gemini is running the pricing model ensemble.</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
                  <AlertTriangleIcon className="h-10 w-10 mb-3" />
                  <h3 className="font-bold text-lg text-red-300">Prediction Failed</h3>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {!isLoading && !error && prediction === null && (
                <div className="text-center text-gray-500">
                  <DollarSignIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="text-xl font-semibold text-gray-400">Awaiting Prediction</h3>
                  <p className="mt-1">Enter asset details and run the model.</p>
                </div>
              )}

              {prediction !== null && chartData.length > 0 && (
                <div className="w-full h-full flex flex-col">
                    <div className="text-center mb-6">
                        <p className="text-lg text-cyan-400 font-semibold">Predicted Closing Price for {formState.ticker}</p>
                        <p className="text-5xl font-bold text-white tracking-tight">${prediction.toFixed(2)}</p>
                    </div>
                    <div className="flex-grow w-full h-80">
                         <PriceChart data={chartData} />
                    </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
