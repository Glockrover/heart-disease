export type Field =
  | { name: string; label: string; help: string; type: "number"; min: number; max: number; step?: number; default: number }
  | { name: string; label: string; help: string; type: "select"; options: { value: number; label: string }[]; default: number };

export const FIELDS: Field[] = [
  { name: "age", label: "Age", help: "Years", type: "number", min: 1, max: 120, default: 54 },
  { name: "sex", label: "Sex", help: "", type: "select", default: 1,
    options: [{ value: 1, label: "Male" }, { value: 0, label: "Female" }] },
  { name: "cp", label: "Chest pain type", help: "", type: "select", default: 0,
    options: [
      { value: 0, label: "Typical angina" },
      { value: 1, label: "Atypical angina" },
      { value: 2, label: "Non-anginal pain" },
      { value: 3, label: "Asymptomatic" },
    ] },
  { name: "trestbps", label: "Resting blood pressure", help: "mm Hg", type: "number", min: 50, max: 250, default: 130 },
  { name: "chol", label: "Serum cholesterol", help: "mg/dl", type: "number", min: 100, max: 600, default: 240 },
  { name: "fbs", label: "Fasting blood sugar > 120 mg/dl", help: "", type: "select", default: 0,
    options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
  { name: "restecg", label: "Resting ECG", help: "", type: "select", default: 0,
    options: [
      { value: 0, label: "Normal" },
      { value: 1, label: "ST-T wave abnormality" },
      { value: 2, label: "Left ventricular hypertrophy" },
    ] },
  { name: "thalach", label: "Max heart rate achieved", help: "bpm", type: "number", min: 50, max: 250, default: 150 },
  { name: "exang", label: "Exercise-induced angina", help: "", type: "select", default: 0,
    options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
  { name: "oldpeak", label: "ST depression (oldpeak)", help: "Induced by exercise relative to rest", type: "number", min: 0, max: 10, step: 0.1, default: 1 },
  { name: "slope", label: "Slope of peak exercise ST", help: "", type: "select", default: 1,
    options: [
      { value: 0, label: "Upsloping" },
      { value: 1, label: "Flat" },
      { value: 2, label: "Downsloping" },
    ] },
  { name: "ca", label: "Major vessels colored by fluoroscopy", help: "", type: "select", default: 0,
    options: [0, 1, 2, 3, 4].map((v) => ({ value: v, label: String(v) })) },
  { name: "thal", label: "Thallium stress test", help: "", type: "select", default: 2,
    options: [
      { value: 0, label: "Unknown (0)" },
      { value: 1, label: "Fixed defect" },
      { value: 2, label: "Normal" },
      { value: 3, label: "Reversible defect" },
    ] },
];
