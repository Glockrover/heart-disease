"use client";

import { useState } from "react";
import { FIELDS } from "@/lib/fields";
import model from "@/lib/model.json";

type Result = { hasHeartDisease: boolean; probability: number } | { error: string };

const initial = Object.fromEntries(FIELDS.map((f) => [f.name, String(f.default)]));

export default function Home() {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const body = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, Number(v)]));
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setResult(await res.json());
    } catch {
      setResult({ error: "Could not reach the prediction API." });
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Heart Disease Predictor</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Enter the patient&apos;s clinical measurements. A Logistic Regression model trained on the
        UCI Cleveland dataset (cross-validated accuracy {(model.metrics.cv_accuracy * 100).toFixed(1)}%)
        predicts whether heart disease is present.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.name} className="flex flex-col gap-1">
            <span className="text-sm font-medium">
              {f.label}
              {f.help && <span className="ml-1 font-normal text-gray-500">({f.help})</span>}
            </span>
            {f.type === "select" ? (
              <select
                className={input}
                value={values[f.name]}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              >
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                className={input}
                type="number"
                required
                min={f.min}
                max={f.max}
                step={f.step ?? 1}
                value={values[f.name]}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              />
            )}
          </label>
        ))}

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-rose-600 px-5 py-2 font-medium text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? "Predicting…" : "Predict"}
          </button>
          <button
            type="button"
            onClick={() => { setValues(initial); setResult(null); }}
            className="rounded-md border border-gray-300 px-5 py-2 font-medium dark:border-gray-700"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8" aria-live="polite">
          {"error" in result ? (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
              {result.error}
            </div>
          ) : (
            <div
              className={`rounded-lg border p-5 ${
                result.hasHeartDisease
                  ? "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100"
                  : "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100"
              }`}
            >
              <p className="text-xl font-semibold">
                {result.hasHeartDisease ? "Heart disease likely" : "Heart disease unlikely"}
              </p>
              <p className="mt-1 text-sm">
                Predicted probability of heart disease: <strong>{(result.probability * 100).toFixed(1)}%</strong>
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className={`h-full ${result.hasHeartDisease ? "bg-rose-600" : "bg-emerald-600"}`}
                  style={{ width: `${result.probability * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <p className="mt-10 text-xs text-gray-500">
        For educational purposes only. This is not a medical diagnosis consult a qualified clinician.
      </p>
    </main>
  );
}
