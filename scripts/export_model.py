"""Train the tuned Logistic Regression from the notebook and export it to JSON
so the Next.js app can run predictions without a Python server.

Usage: env/bin/python scripts/export_model.py
"""
import json
from pathlib import Path

import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, train_test_split

ROOT = Path(__file__).resolve().parent.parent
df = pd.read_csv(ROOT / "Data" / "heart-disease.csv", encoding="utf-8-sig")
X, y = df.drop("target", axis=1), df["target"]

# Best hyperparameters found by GridSearchCV in the notebook
params = dict(C=0.23357214690901212, solver="liblinear")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
test_acc = LogisticRegression(**params).fit(X_train, y_train).score(X_test, y_test)
cv_acc = cross_val_score(LogisticRegression(**params), X, y, cv=5, scoring="accuracy").mean()

# Final model is trained on all data
clf = LogisticRegression(**params).fit(X, y)

out = {
    "features": list(X.columns),
    "coefficients": clf.coef_[0].tolist(),
    "intercept": float(clf.intercept_[0]),
    "metrics": {"test_accuracy": round(test_acc, 4), "cv_accuracy": round(cv_acc, 4)},
}
dest = ROOT / "web" / "src" / "lib" / "model.json"
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(json.dumps(out, indent=2))
print(f"Saved {dest}\n test acc={test_acc:.3f}  cv acc={cv_acc:.3f}")
