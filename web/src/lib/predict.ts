import model from "./model.json";

export type PatientInput = Record<(typeof model.features)[number], number>;

export interface Prediction {
  hasHeartDisease: boolean;
  probability: number; // probability of heart disease (0-1)
}

/** Logistic regression: p = sigmoid(w·x + b) */
export function predict(input: PatientInput): Prediction {
  const z = model.features.reduce((sum, f, i) => {
    const v = Number(input[f]);
    if (!Number.isFinite(v)) throw new Error(`Invalid value for "${f}"`);
    return sum + model.coefficients[i] * v;
  }, model.intercept);
  const probability = 1 / (1 + Math.exp(-z));
  return { hasHeartDisease: probability >= 0.5, probability };
}

export const modelMetrics = model.metrics;
export const modelFeatures = model.features;
