import React, { useState } from 'react';

// SVG Icons as components
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

  // Replace this with your actual API call
  const simulateAPI = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const totalScore = data.frequency * 2 + (100 - data.recency) + (data.monetary / 10);
    
    if (totalScore > 300) {
      return { segment_label: 'High-Value Loyal', cluster_id: 'A1' };
    } else if (totalScore > 150) {
      return { segment_label: 'Mid-Value Growing', cluster_id: 'B2' };
    } else {
      return { segment_label: 'Low-Value New', cluster_id: 'C3' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      // Replace with: const response = await axios.post(API_URL, formData);
      const response = await simulateAPI(formData);
      setPrediction(response);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to get segment prediction from the server.");
    } finally {
      setLoading(false);
    }
  };

  const renderPrediction = () => {
    if (!prediction) return null;

    const segment = prediction.segment_label;
    let cardColor = 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)';
    let recommendation = "Analyze spending habits for targeted offers.";
    let Icon = TrendingUpIcon;
    let accentColor = '#3f51b5';
    let borderColor = '#3f51b5';
    let iconBg = '#e3f2fd';

    if (segment.includes('High-Value')) {
      cardColor = 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)';
      accentColor = '#2e7d32';
      borderColor = '#2e7d32';
      iconBg = '#e8f5e9';
      recommendation = "High-Value Customer: Offer exclusive loyalty programs and premium credit services.";
      Icon = WalletIcon;
    } else if (segment.includes('Mid-Value')) {
      cardColor = 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)';
      accentColor = '#f57f17';
      borderColor = '#f57f17';
      iconBg = '#fffde7';
      recommendation = "Mid-Value Customer: Encourage increased frequency with targeted product promotions.";
      Icon = AwardIcon;
    } else {
      cardColor = 'linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%)';
      accentColor = '#c62828';
      borderColor = '#c62828';
      iconBg = '#ffebee';
    }

    return (
      <div style={{
        marginTop: '32px',
        background: cardColor,
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        borderTop: `6px solid ${borderColor}`,
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <div style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: iconBg,
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              color: accentColor
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Icon />
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: accentColor,
              opacity: 0.8,
              marginBottom: '8px'
            }}>
              PREDICTED SEGMENT
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: accentColor,
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {segment}
            </h2>
          </div>

          <div style={{
            padding: '24px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <p style={{
              fontWeight: 500,
              color: '#333',
              lineHeight: '1.8',
              margin: 0
            }}>
              <strong style={{ color: accentColor }}>Marketing Action:</strong> {recommendation}
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1px',
              color: accentColor,
              opacity: 0.7
            }}>
              Cluster ID: {prediction.cluster_id}
            </span>
          </div>
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
        maxWidth: '900px',
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
              marginBottom: '8px'
            }}>
              Customer Segment Finder
            </h1>
            <p style={{
              color: '#666',
              fontWeight: 500,
              letterSpacing: '1px',
              fontSize: '1.125rem'
            }}>
              RFM Analysis & Segmentation
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Recency Input */}
              <div style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                padding: '20px',
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
                    RECENCY
                  </span>
                </div>
                <input
                  type="number"
                  name="recency"
                  value={formData.recency}
                  onChange={handleChange}
                  placeholder="Days Since Last Transaction"
                  required
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

              {/* Frequency Input */}
              <div style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                padding: '20px',
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
                    FREQUENCY
                  </span>
                </div>
                <input
                  type="number"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  placeholder="Total Transactions"
                  required
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

              {/* Monetary Input */}
              <div style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                padding: '20px',
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
                    MONETARY
                  </span>
                </div>
                <input
                  type="number"
                  name="monetary"
                  value={formData.monetary}
                  onChange={handleChange}
                  placeholder="Average Transaction Amount"
                  required
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
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
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
              {loading ? 'Analyzing...' : 'Analyze Customer Segment'}
            </button>
          </form>

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
              Error: {error}
            </div>
          )}

          {renderPrediction()}
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