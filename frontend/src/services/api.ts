// src/services/api.ts
import type { PredictionResponse } from '../types';

// URL do backend FastAPI
const API_URL = 'http://localhost:8000/previsao';

export const analyzeImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha na comunicação com o servidor');
  }

  return response.json();
};
