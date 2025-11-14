
import { GoogleGenAI, Type } from "@google/genai";
import type { PredictionInput } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getPricePrediction(input: PredictionInput): Promise<number> {
  const { ticker, day1Open, day2Open, day3Open, volume, jobsReport } = input;

  const prompt = `
    You are a sophisticated financial asset pricing model ensemble. Your task is to predict the next closing price for a given asset.
    You must base your prediction on the provided historical open prices (3 steps behind the closing price to be predicted) and supply/demand indicators.
    - The supply indicator is the recent trading volume.
    - The demand indicator is the strength of the latest jobs report.
    - The pricing model should be an SVR model.
    
    Analyze the following data and return ONLY a JSON object with the predicted price.
    
    Asset Ticker: ${ticker}
    Historical Open Prices:
    - 3 days ago: ${day1Open}
    - 2 days ago: ${day2Open}
    - 1 day ago: ${day3Open}
    
    Supply/Demand Indicators:
    - Trading Volume (Supply): ${volume}
    - Jobs Report Strength (Demand): ${jobsReport}
    
    Based on this data, provide your prediction for the next closing price.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedPrice: {
              type: Type.NUMBER,
              description: "The predicted closing price of the asset."
            },
          },
          required: ["predictedPrice"]
        },
        temperature: 0.2, // Lower temperature for more deterministic financial prediction
      }
    });

    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("Received an empty response from the API.");
    }
    
    const result = JSON.parse(responseText);
    
    if (typeof result.predictedPrice !== 'number') {
      throw new Error("Invalid data format in API response. 'predictedPrice' must be a number.");
    }

    return result.predictedPrice;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get prediction from AI model. Please check the console for details.");
  }
}
