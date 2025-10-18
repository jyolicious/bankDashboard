import React from "react";
// Import the new map component
import CityCustomerMap from './CityCustomerMap';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './Dashboard.css';

const monthlyData = [
  { month: "Jan", amount: 120 },
  { month: "Feb", amount: 135 },
  { month: "Mar", amount: 110 },
  { month: "Apr", amount: 160 },
  { month: "May", amount: 145 },
  { month: "Jun", amount: 170 },
];

const loanTypeData = [
  { name: "Mortgage", value: 45 },
  { name: "Personal", value: 25 },
  { name: "Auto", value: 15 },
  { name: "Business", value: 15 },
];

const creditData = [
  { tier: "Excellent", rate: 6.1 },
  { tier: "Good", rate: 7.4 },
  { tier: "Fair", rate: 9.5 },
  { tier: "Poor", rate: 13.2 },
];

const applicationData = [
  { month: "Jan", apps: 850 },
  { month: "Feb", apps: 920 },
  { month: "Mar", apps: 880 },
  { month: "Apr", apps: 1050 },
  { month: "May", apps: 1120 },
  { month: "Jun", apps: 1080 },
  { month: "Jul", apps: 1200 },
  { month: "Aug", apps: 1150 },
];

// ---------------- EXISTING NEW DATA ----------------
const ageGroupData = [
  { group: "<26", amount: 2447.22 },
  { group: "26-35", amount: 2502.23 },
  { group: "36-45", amount: 2472.26 },
  { group: "46-55", amount: 2523.70 },
  { group: "56-65", amount: 2593.61 },
  { group: "66+", amount: 2506.42 },
];

const cityData = [
  { city: "San Jose", customers: 150 },
  { city: "San Francisco", customers: 144 },
  { city: "Indianapolis", customers: 143 },
  { city: "Detroit", customers: 135 },
  { city: "Tucson", customers: 133 },
  { city: "El Paso", customers: 129 },
  { city: "Las Vegas", customers: 129 },
  { city: "Denver", customers: 129 },
  { city: "San Diego", customers: 124 },
  { city: "Columbus", customers: 122 },
];

const transactionComparisonData = [
  { month: "Jan", "2023": 550, "2024": 370 },
  { month: "Feb", "2023": 371, "2024": 395 },
  { month: "Mar", "2023": 426, "2024": 410 },
  { month: "Apr", "2023": 381, "2024": 385 },
  { month: "May", "2023": 388, "2024": 400 },
  { month: "Jun", "2023": 450, "2024": 415 },
  { month: "Jul", "2023": 500, "2024": 420 },
  { month: "Aug", "2023": 419, "2024": 405 },
  { month: "Sep", "2023": 373, "2024": 378 },
  { month: "Oct", "2023": 375, "2024": 390 },
  { month: "Nov", "2023": 356, "2024": 360 },
  { month: "Dec", "2023": 409, "2024": 425 },
];
// ------------------------------------------

// ---------------- NEW FRAUD DATA (Chart 8) ----------------
const monthlyFraudData = [
  { month: "Jan", fraud: 383 },
  { month: "Feb", fraud: 371 },
  { month: "Mar", fraud: 426 },
  { month: "Apr", fraud: 381 },
  { month: "May", fraud: 388 },
  { month: "Jun", fraud: 404 },
  { month: "Jul", fraud: 415 },
  { month: "Aug", fraud: 419 },
  { month: "Sep", fraud: 373 },
  { month: "Oct", fraud: 375 },
  { month: "Nov", fraud: 356 },
  { month: "Dec", fraud: 409 },
];
// ------------------------------------------

const COLORS = ["#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444"];

const kpiItems = [
  { title: "Total Loan Principal", value: "$195.9K", subtitle: "Active loans", color: "blue", icon: "💰" },
  { title: "Approval Rate", value: "72%", subtitle: "+5% vs last month", color: "green", icon: "✓" },
  { title: "Total Applications", value: "11,050", subtitle: "This quarter", color: "purple", icon: "📋" },
  { title: "NPL Ratio", value: "4.2%", subtitle: "Non-performing loans", color: "orange", icon: "⚠" },
];

const AnalyticsDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="header-title">Loan Analytics Dashboard</h1>
          <p className="header-subtitle">Real-time insights and performance metrics</p>
        </div>

        {/* KPI Cards Grid (4 columns) */}
        <div className="kpi-grid">
          {kpiItems.map((kpi, i) => (
            <div key={i} className="kpi-card">
              <div className="kpi-header">
                <div className={`kpi-icon kpi-icon-${kpi.color}`}>
                  {kpi.icon}
                </div>
              </div>
              <h3 className="kpi-value">{kpi.value}</h3>
              <p className="kpi-title">{kpi.title}</p>
              <p className="kpi-subtitle">{kpi.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid (2 columns, 4 rows now) */}
        <div className="charts-grid">
          {/* Chart 1: Monthly Lending Volume */}
          <div className="chart-container">
            <h3 className="chart-title">Monthly Lending Volume (in thousands)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ fill: "#0ea5e9", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Loan Type Distribution */}
          <div className="chart-container">
            <h3 className="chart-title">Loan Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={loanTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {loanTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Interest Rate by Credit Score */}
          <div className="chart-container">
            <h3 className="chart-title">Interest Rate by Credit Score (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={creditData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="tier" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Bar dataKey="rate" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Monthly Loan Applications */}
          <div className="chart-container">
            <h3 className="chart-title">Monthly Loan Applications</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="apps"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 5: Avg Transaction Amount by Age Group (Line Chart) */}
          <div className="chart-container">
            <h3 className="chart-title">Average Loan Amount by Age Group ($)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="group" interval={0} style={{ fontSize: '12px' }} />
                <YAxis domain={[2400, 2600]} style={{ fontSize: '12px' }} /> {/* Set domain for better visualization */}
                <Tooltip
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#ef4444" /* Using a new color (red) */
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 6: Top 10 Cities by Customer Count (Map Component) */}
          <div className="chart-container map-chart-container">
            <h3 className="chart-title">Customers Per City (Top 10)</h3>
            <CityCustomerMap />
          </div>

          {/* Chart 7: Monthly Transaction Comparison (Area Chart) - Updated Colors */}
          <div className="chart-container">
            <h3 className="chart-title">Monthly Transaction Count (2023 vs 2024)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={transactionComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                
                <Area
                  type="monotone"
                  dataKey="2023"
                  stroke="#5f5ce1" // Simplified Indigo/Purple
                  fill="#5f5ce1" // Simplified Indigo/Purple fill
                  fillOpacity={0.4}
                  strokeWidth={3}
                  dot={{ fill: "#5f5ce1", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="2023 Transactions"
                />
                
                <Area
                  type="monotone"
                  dataKey="2024"
                  stroke="#4fc7ff" // Simplified Light Blue
                  fill="#4fc7ff" // Simplified Light Blue fill
                  fillOpacity={0.4}
                  strokeWidth={3}
                  dot={{ fill: "#4fc7ff", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="2024 Transactions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* ---------------- NEW CHART 8: Monthly Fraud Analysis (Bar Chart) ---------------- */}
          <div className="chart-container">
            <h3 className="chart-title">Monthly Fraud Incidents</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyFraudData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip formatter={(value) => [value, 'Fraud Count']} />
                <Bar 
                  dataKey="fraud" 
                  fill="#ef4444" // Using the Red/Error color
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* ---------------- END NEW CHART 8 ---------------- */}

        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;