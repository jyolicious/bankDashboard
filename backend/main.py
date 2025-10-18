from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import os

# --- 1. API Initialization and Configuration ---

app = FastAPI(
    title="Bank DWM Prediction API",
    description="Serves predictions for Risk Classification, Fraud Detection, and Customer Segmentation."
)

# Allow React (which runs on a different port) to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development (Change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. Data Models (Pydantic) ---

class RiskInput(BaseModel):
    loan_amount: float
    interest_rate: float
    loan_term: int
    age: int

class AnomalyInput(BaseModel):
    transaction_amount: float
    account_balance_after_transaction: float
    credit_card_balance: float
    rewards_points: float

class SegmentationInput(BaseModel):
    recency: int
    frequency: int
    monetary: float


# --- 3. Global Model & Data Loading ---

models = {}
DATA_FILE = 'cleaned_banking.csv'
PKL_DIR = './backend/models'

def load_data_and_models():
    print("--- Loading Models and Data ---")

    # Load Banking Data
    try:
        df_banking = pd.read_csv(DATA_FILE)
        models['dim_customer'] = df_banking.copy()
        print(f"✅ Data '{DATA_FILE}' loaded. Shape: {models['dim_customer'].shape}")
    except FileNotFoundError:
        print(f"❌ ERROR: Data file not found at '{DATA_FILE}'. Dashboard will fail.")
    except Exception as e:
        print(f"❌ ERROR loading data: {e}")

    # Load Models
    try:
        models['scaler_anomaly'] = joblib.load(os.path.join(PKL_DIR, "anomaly_feature_scaler.pkl"))
        models['iso_model'] = joblib.load(os.path.join(PKL_DIR, "iso_forest_model.pkl"))

        models['kmeans_model'] = joblib.load(os.path.join(PKL_DIR, "kmeans_model.pkl"))
        models['scaler_rfm'] = joblib.load(os.path.join(PKL_DIR, "rfm_feature_scaler.pkl"))

        models['dt_model'] = joblib.load(os.path.join(PKL_DIR, "risk_dt_model.pkl"))
        models['scaler_risk'] = joblib.load(os.path.join(PKL_DIR, "risk_feature_scaler.pkl"))
        models['le_risk'] = joblib.load(os.path.join(PKL_DIR, "risk_label_encoder.pkl"))

        print("✅ All models loaded successfully.")
    except Exception as e:
        print(f"❌ ERROR loading models: {e}")

# Call loader
load_data_and_models()


# --- 4. Prediction Endpoints ---

@app.post("/predict/risk")
def predict_risk(data: RiskInput):
    """Predicts the Loan Status (Risk Level) for a new applicant."""
    features = ['loan_amount', 'interest_rate', 'loan_term', 'age']
    try:
        input_data = [[getattr(data, feat) for feat in features]]
        scaled_input = models['scaler_risk'].transform(input_data)
        prediction_encoded = models['dt_model'].predict(scaled_input)[0]
        predicted_label = models['le_risk'].inverse_transform([prediction_encoded])[0]

        risk_map = {'Approved': 'Low Risk', 'Closed': 'Medium Risk', 'Rejected': 'High Risk'}
        return {
            "status": "success",
            "predicted_status": predicted_label,
            "risk_level": risk_map.get(predicted_label, "Unknown Risk")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk prediction failed: {str(e)}")


@app.post("/predict/anomaly")
def predict_anomaly(data: AnomalyInput):
    """Calculates the Anomaly Score for a new transaction."""
    features = ['transaction_amount', 'account_balance_after_transaction', 'credit_card_balance', 'rewards_points']
    try:
        input_data = [[getattr(data, feat) for feat in features]]
        scaled_input = models['scaler_anomaly'].transform(input_data)
        anomaly_score = models['iso_model'].decision_function(scaled_input)[0]
        is_fraudulent = anomaly_score < 0.05
        return {
            "status": "success",
            "anomaly_score": round(anomaly_score, 4),
            "is_flagged": bool(is_fraudulent),
            "alert_message": "Flagged for Review" if is_fraudulent else "Normal Transaction"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Anomaly prediction failed: {str(e)}")


@app.post("/predict/segment")
def predict_segment(data: SegmentationInput):
    """Predicts the customer's Segment Label based on their RFM metrics."""
    features = ['recency', 'frequency', 'monetary']
    try:
        input_data = [[getattr(data, feat) for feat in features]]
        scaled_input = models['scaler_rfm'].transform(input_data)
        cluster_id = models['kmeans_model'].predict(scaled_input)[0]

        segment_map = {0: 'Mid-Value/Loyal', 1: 'Low-Value/New', 2: 'High-Value/Frequent'}
        return {
            "status": "success",
            "cluster_id": int(cluster_id),
            "segment_label": segment_map.get(cluster_id, "Unknown Segment")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Segmentation prediction failed: {str(e)}")


# --- 5. Visualization Endpoints ---

@app.get("/data/segment_summary")
def get_segment_summary():
    """Provides data for the segmentation pie chart/bar chart."""
    df_customer = models['dim_customer'].copy()
    if 'Segment_Label' not in df_customer.columns:
        return {"error": "Segment_Label column not found in customer data. Run Phase 2 code again."}
    summary = df_customer['Segment_Label'].value_counts().reset_index()
    summary.columns = ['segment', 'count']
    total = summary['count'].sum()
    summary['percentage'] = (summary['count'] / total * 100).round(2)
    return {"status": "success", "data": summary.to_dict('records')}


@app.get("/data/loan_risk_summary")
def get_loan_risk_summary():
    """Provides a sample of data for the Loan Risk Table with sorting."""
    df = models['dim_customer'].copy()
    df_table = df[[
        'Customer ID',
        'First Name',
        'Last Name',
        'Loan Amount',
        'Interest Rate',
        'Loan Status',
        'Loan Term',
        'Age'
    ]].rename(columns={
        'Loan Status': 'Risk Prediction'
    }).head(50)
    return df_table.to_dict(orient='records')
