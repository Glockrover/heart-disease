# Predicting Heart Disease using Machine Learning
This project aims to build a machine learning model capable of predicting whether or not an individual has heart disease based on various medical attributes. The project follows a standard data science and machine learning workflow, including problem definition, data exploration, modeling, and evaluation.

## 1. Problem Definition
The problem can be stated as: Given clinical parameters about a patient, can we predict whether or not they have heart disease?

## 2. Data
The data used in this project is sourced from the Cleveland data from the UCI Machine Learning Repository, also available on Kaggle. The dataset contains various medical attributes for patients, including:

* age: Age of the patient in years
* sex: Male/Female
* cp: Chest pain type
* trestbps: Resting blood pressure (in mm Hg)
* chol: Serum cholesterol in mg/dl
* fbs: Fasting blood sugar > 120 mg/dl
* restecg: Resting electrocardiographic results
* thalach: Maximum heart rate achieved
* exang: Exercise-induced angina (True/False)
* oldpeak: ST depression induced by exercise relative to rest
* slope: The slope of the peak exercise ST segment
* ca: Number of major vessels (0-3) colored by fluoroscopy
* thal: Thallium stress test result (normal; fixed defect; reversible defect)
* target: The predicted attribute (0 = no heart disease, 1 = heart disease)
## 3. Evaluation
The evaluation metric for this project is accuracy. The goal is to reach 95% accuracy at predicting heart disease during the proof of concept.

## 4. Features
A detailed data dictionary is provided within the notebook, explaining each feature in the dataset.

## 5. Modeling
Several machine learning models were explored and evaluated for this prediction task:

* Logistic Regression
* K-Nearest Neighbors Classifier
* Random Forest Classifier
The models were trained and tested on a split of the data. Hyperparameter tuning was performed using RandomizedSearchCV and GridSearchCV to optimize model performance.

## 6. Experimentation and Results
The project involved:

Exploratory Data Analysis (EDA) to understand the data distribution, relationships between features, and the target variable.
Comparison of baseline model performances.
Hyperparameter tuning to improve the performance of the selected models.
Evaluation of the best-performing model using metrics such as accuracy, precision, recall, F1-score, ROC curve, and Confusion Matrix, including cross-validation.
Analysis of feature importance to understand which features contributed most to the model's predictions.
Based on the evaluation, the tuned Logistic Regression model achieved the best performance with an accuracy of 83.61% on the test set. Cross-validation confirmed similar performance across different folds.

The feature importance analysis highlighted the key features influencing the model's predictions, such as cp (chest pain type), thalach (maximum heart rate achieved), and exang (exercise-induced angina).

Future Work
Future steps could include:

Exploring more advanced models like CatBoost or XGBoost.
Collecting more data to potentially improve model performance.
Further feature engineering or selection.
Developing a deployment strategy for the model if the evaluation metric is met.
