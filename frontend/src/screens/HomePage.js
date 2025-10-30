import React from "react";
import "./HomePage.css";
import { FaChartBar, FaLock, FaUsers, FaBullseye, FaPuzzlePiece, FaMoneyCheckAlt, FaChartLine, FaTachometerAlt } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="header-badge">🌟 AMERICAN BANK 2023</div>

        <h1 className="hero-title">
          Transaction Analytics <br />
          <span className="highlight">Intelligence Dashboard</span>
        </h1>

        <p className="hero-subtitle">
          Powerful insights for Fraud Detection, Loan Approval Analysis, and Customer Value
          Segmentation through an interactive analytical dashboard.
        </p>

        {/* Top Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <FaChartBar className="icon" />
            <h3>2.4M+</h3>
            <p>Total Transactions</p>
          </div>
          <div className="stat-card">
            <FaLock className="icon" />
            <h3>1,247</h3>
            <p>Fraud Cases Detected</p>
          </div>
          <div className="stat-card">
            <FaUsers className="icon" />
            <h3>89K</h3>
            <p>Active Customers</p>
          </div>
          <div className="stat-card">
            <FaBullseye className="icon" />
            <h3>96.5%</h3>
            <p>Prediction Accuracy</p>
          </div>
        </div>

        {/* Feature Links Row */}
        <div className="features-row">
          <a href="/segment" className="feature-card">
            <FaPuzzlePiece className="feature-icon" /> Segment Finder
          </a>
          <a href="/loan-risk" className="feature-card">
            <FaMoneyCheckAlt className="feature-icon" /> Loan Detection
          </a>
          <a href="/fraud" className="feature-card">
            <FaChartLine className="feature-icon" /> Fraud Scoring
          </a>
          <a href="/analytics" className="feature-card">
            <FaTachometerAlt className="feature-icon" /> Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
