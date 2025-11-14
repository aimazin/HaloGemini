
import React from 'react';
import type { PredictionInput } from '../types';
import { LoadingSpinnerIcon } from './icons';

interface PredictionFormProps {
  formState: PredictionInput;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  formState,
  handleFormChange,
  handleSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ticker" className="block text-sm font-medium text-gray-300">
          Asset Ticker
        </label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          value={formState.ticker}
          onChange={handleFormChange}
          className="mt-1 block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
          placeholder="e.g., AAPL"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="day1Open" className="block text-sm font-medium text-gray-300">
            Day 1 Open
          </label>
          <input
            type="text"
            name="day1Open"
            id="day1Open"
            value={formState.day1Open}
            onChange={handleFormChange}
            className="mt-1 block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
            placeholder="e.g., 150.25"
            required
          />
        </div>
        <div>
          <label htmlFor="day2Open" className="block text-sm font-medium text-gray-300">
            Day 2 Open
          </label>
          <input
            type="text"
            name="day2Open"
            id="day2Open"
            value={formState.day2Open}
            onChange={handleFormChange}
            className="mt-1 block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
            placeholder="e.g., 151.00"
            required
          />
        </div>
        <div>
          <label htmlFor="day3Open" className="block text-sm font-medium text-gray-300">
            Day 3 Open
          </label>
          <input
            type="text"
            name="day3Open"
            id="day3Open"
            value={formState.day3Open}
            onChange={handleFormChange}
            className="mt-1 block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
            placeholder="e.g., 150.75"
            required
          />
        </div>
      </div>

       <div>
        <label htmlFor="volume" className="block text-sm font-medium text-gray-300">
          Trading Volume (Supply)
        </label>
        <input
          type="text"
          name="volume"
          id="volume"
          value={formState.volume}
          onChange={handleFormChange}
          className="mt-1 block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
          placeholder="e.g., 85M"
          required
        />
      </div>

       <div>
        <label htmlFor="jobsReport" className="block text-sm font-medium text-gray-300">
          Jobs Report (Demand)
        </label>
        <select
          name="jobsReport"
          id="jobsReport"
          value={formState.jobsReport}
          onChange={handleFormChange}
          className="mt-1 block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
          required
        >
          <option>Strong</option>
          <option>Neutral</option>
          <option>Weak</option>
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800 disabled:bg-cyan-800 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon className="h-5 w-5 mr-2" />
              Predicting...
            </>
          ) : (
            'Predict Closing Price'
          )}
        </button>
      </div>
    </form>
  );
};
