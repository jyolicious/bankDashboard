import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const RepeatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="17 1 21 5 17 9"></polyline>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
    <polyline points="7 23 3 19 7 15"></polyline>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
  </svg>
);

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const AwardIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const WalletIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
);

const SegmentFinder = () => {
  const [formData, setFormData] = useState({
    recency: 30,
    frequency: 10,
    monetary: 500.0,
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: parseFloat(value) || 0 
    }));
  };

  const simulateAPI = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const totalScore = data.frequency * 2 + (100 - data.recency) + (data.monetary / 10);
    
    if (totalScore > 300) {
      return { segment_label: 'High-Value Loyal', cluster_id: 'A1', score: totalScore };
    } else if (totalScore > 150) {
      return { segment_label: 'Mid-Value Growing', cluster_id: 'B2', score: totalScore };
    } else {
      return { segment_label: 'Low-Value New', cluster_id: 'C3', score: totalScore };
    }
  };

  const handleSubmit = async () => {
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      const response = await simulateAPI(formData);
      setPrediction(response);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to get segment prediction from the server.");
    } finally {
      setLoading(false);
    }
  };

  const renderGraphs = () => {
    if (!prediction) return null;

    const segment = prediction.segment_label;
    let segmentColor = '#3f51b5';
    let recommendation = "Analyze spending habits for targeted offers.";
    let Icon = TrendingUpIcon;

    if (segment.includes('High-Value')) {
      segmentColor = '#2e7d32';
      recommendation = "High-Value Customer: Offer exclusive loyalty programs and premium credit services.";
      Icon = WalletIcon;
    } else if (segment.includes('Mid-Value')) {
      segmentColor = '#f57f17';
      recommendation = "Mid-Value Customer: Encourage increased frequency with targeted product promotions.";
      Icon = AwardIcon;
    } else {
      segmentColor = '#c62828';
    }

    const rfmData = [
      {
        name: 'Recency',
        score: Math.max(0, 100 - formData.recency),
        maxScore: 100,
        fill: '#9dabeaff'
      },
      {
        name: 'Frequency',
        score: Math.min(formData.frequency * 5, 100),
        maxScore: 100,
        fill: '#3b57e4ff'
      },
      {
        name: 'Monetary',
        score: Math.min((formData.monetary / 10), 100),
        maxScore: 100,
        fill: '#250c5aff'
      }
    ];

    const radarData = [
      {
        metric: 'Recency',
        value: Math.max(0, 100 - formData.recency),
        fullMark: 100
      },
      {
        metric: 'Frequency',
        value: Math.min(formData.frequency * 5, 100),
        fullMark: 100
      },
      {
        metric: 'Monetary',
        value: Math.min((formData.monetary / 10), 100),
        fullMark: 100
      },
      {
        metric: 'Loyalty',
        value: Math.min(formData.frequency * 3, 100),
        fullMark: 100
      },
      {
        metric: 'Engagement',
        value: Math.max(0, 100 - (formData.recency * 2)),
        fullMark: 100
      }
    ];

    const segmentDistribution = [
      { name: 'High-Value', value: segment.includes('High-Value') ? 35 : 25, color: '#2e7d32' },
      { name: 'Mid-Value', value: segment.includes('Mid-Value') ? 45 : 35, color: '#f57f17' },
      { name: 'Low-Value', value: segment.includes('Low-Value') ? 35 : 20, color: '#c62828' },
      { name: 'Others', value: 20, color: '#9e9e9e' }
    ];

    const trendData = [
      { month: 'Jan', value: 20 },
      { month: 'Feb', value: 35 },
      { month: 'Mar', value: 45 },
      { month: 'Apr', value: 55 },
      { month: 'May', value: Math.min(formData.frequency * 5, 100) },
      { month: 'Jun', value: Math.min(formData.frequency * 5 + 10, 100) }
    ];

    return (
      <div style={{ marginTop: '32px', animation: 'fadeIn 0.6s ease-out' }}>
        <div style={{
          background: `linear-gradient(135deg, ${segmentColor}15 0%, ${segmentColor}30 100%)`,
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderLeft: `6px solid ${segmentColor}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: segmentColor,
                marginBottom: '12px'
              }}>
                CUSTOMER SEGMENT PREDICTION
              </div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: segmentColor,
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>
                {segment}
              </h2>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: 0
              }}>
                <strong>Cluster:</strong> {prediction.cluster_id} | <strong>Score:</strong> {prediction.score.toFixed(1)}
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              color: segmentColor
            }}>
              <Icon />
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>RFM Score Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rfmData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {rfmData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>Customer Profile Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="metric" stroke="#666" />
                <PolarRadiusAxis stroke="#666" />
                <Radar 
                  name="Customer Score" 
                  dataKey="value" 
                  stroke={segmentColor} 
                  fill={segmentColor} 
                  fillOpacity={0.6} 
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>Segment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {segmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>Engagement Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={segmentColor} 
                  strokeWidth={3}
                  dot={{ fill: segmentColor, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${segmentColor}`
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: segmentColor,
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>Marketing Action Recommendation</h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.8',
            margin: 0
          }}>
            {recommendation}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '48px 16px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          padding: '48px',
          backdropFilter: 'blur(10px)',
          animation: 'slideUp 0.8s ease-out'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px',
              margin: '0 0 8px 0'
            }}>
              Customer Segment Finder
            </h1>
            <p style={{
              color: '#666',
              fontWeight: 500,
              letterSpacing: '1px',
              fontSize: '1.125rem',
              margin: 0
            }}>
              Advanced RFM Analysis & Visual Segmentation
            </p>
          </div>

          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#667eea' }}>
                  <CalendarIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    RECENCY (DAYS)
                  </span>
                </div>
                <input
                  type="number"
                  name="recency"
                  value={formData.recency}
                  onChange={handleChange}
                  placeholder="Days Since Last Transaction"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#667eea' }}>
                  <RepeatIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    FREQUENCY (COUNT)
                  </span>
                </div>
                <input
                  type="number"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  placeholder="Total Transactions"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#667eea' }}>
                  <DollarIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    MONETARY ($)
                  </span>
                </div>
                <input
                  type="number"
                  name="monetary"
                  value={formData.monetary}
                  onChange={handleChange}
                  placeholder="Average Transaction Amount"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'white',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                textTransform: 'none'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {loading ? '🔄 Analyzing Customer Data...' : '📊 Analyze & Visualize Segment'}
            </button>
          </div>

          {error && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#ffebee',
              borderLeft: '4px solid #c62828',
              borderRadius: '8px',
              color: '#c62828',
              fontWeight: 500,
              animation: 'fadeIn 0.3s ease-out'
            }}>
              ⚠️ Error: {error}
            </div>
          )}

          {renderGraphs()}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input:focus {
          outline: none;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default SegmentFinder;