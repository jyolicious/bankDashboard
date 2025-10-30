# 🏦 American Bank 2023 – Transaction Analytics Dashboard

A full-stack **Bank Transaction Analytics Dashboard** built for the **American Bank (2023)**.  
This project provides **Fraud Detection**, **Loan Approval Analysis**, and **Customer Value Segmentation** insights through an interactive analytical dashboard.

---

## 🚀 Features

### 🔍 Fraud Detection
- Detect suspicious or fraudulent transactions using trained ML models.

### 💰 Loan Approval Analysis
- Analyze loan approval patterns and predict loan risk levels.

### 👥 Customer Value Finder
- Classify customers into **High**, **Medium**, or **Low Value** segments based on spending and activity.

---

## 🧠 Tech Stack

### Frontend
- **React.js**
- **Recharts / Chart.js** for data visualization
- **Lucide-react** and **Framer Motion** for UI design and animations

### Backend
- **FastAPI** (Python)
- **Machine Learning Models** trained using **pandas**, **pydantic**, and **joblib**
- **Uvicorn** as ASGI server

---

## 📂 Project Structure

bank_dasboard/
│
├── frontend/ # React Frontend
│ ├── src/
│ └── package.json
│
├── backend/ # FastAPI Backend
│ ├── main.py
│ ├── models/
│ ├── data/
│ └── trained_models/
│
└── README.md

## ⚙️ Installation & Setup

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
This will start the React app at: http://localhost:3000/

### 🖥️ Backend Setup
Be in root directory only
venv\Scripts\activate
pip install fastapi uvicorn pydantic pandas joblib
uvicorn backend.main:app 


This will start the FastAPI backend at:
👉 http://127.0.0.1:8000/

Create virtual environment in root directory to run backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
