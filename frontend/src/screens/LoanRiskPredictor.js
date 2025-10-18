import React, { useState } from 'react';

// SVG Icons as components
const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const PercentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const LoanRiskPredictor = () => {
  const [formData, setFormData] = useState({
    loan_amount: 35000,
    interest_rate: 4.5,
    loan_term: 48,
    age: 35,
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

  // Simulated API call
  const simulateAPI = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const riskScore = (data.loan_amount / 1000) + (data.interest_rate * 5) - (data.age * 2) - (data.loan_term / 2);
    
    if (riskScore > 100) {
      return { risk_level: 'High Risk', predicted_status: 'Rejected', confidence: 87 };
    } else if (riskScore > 50) {
      return { risk_level: 'Medium Risk', predicted_status: 'Under Review', confidence: 72 };
    } else {
      return { risk_level: 'Low Risk', predicted_status: 'Approved', confidence: 94 };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    
    if (formData.loan_amount <= 0 || formData.age <= 0) {
      setError('Please enter valid positive values for Loan Amount and Age.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await simulateAPI(formData);
      setPrediction(response);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to get risk prediction from the server.");
    } finally {
      setLoading(false);
    }
  };

  const renderPrediction = () => {
    if (!prediction) return null;

    const riskLevel = prediction.risk_level;
    let cardColor = 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)';
    let recommendation = "Review application details carefully before proceeding.";
    let Icon = ShieldIcon;
    let accentColor = '#f57f17';
    let borderColor = '#f57f17';
    let iconBg = '#fffde7';

    if (riskLevel.includes('Low')) {
      cardColor = 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)';
      accentColor = '#2e7d32';
      borderColor = '#2e7d32';
      iconBg = '#e8f5e9';
      recommendation = "Excellent candidate! Low default risk with strong repayment indicators.";
      Icon = CheckCircleIcon;
    } else if (riskLevel.includes('High')) {
      cardColor = 'linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%)';
      accentColor = '#c62828';
      borderColor = '#c62828';
      iconBg = '#ffebee';
      recommendation = "High default risk detected. Consider additional collateral or alternative terms.";
      Icon = AlertCircleIcon;
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
              RISK ASSESSMENT
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: accentColor,
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {riskLevel}
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
              <strong style={{ color: accentColor }}>Recommendation:</strong> {recommendation}
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
              Status: {prediction.predicted_status} • Confidence: {prediction.confidence}%
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
              Loan Risk Predictor
            </h1>
            <p style={{
              color: '#666',
              fontWeight: 500,
              letterSpacing: '1px',
              fontSize: '1.125rem'
            }}>
              AI-Powered Risk Assessment
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Loan Amount Input */}
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
                    LOAN AMOUNT
                  </span>
                </div>
                <input
                  type="number"
                  name="loan_amount"
                  value={formData.loan_amount}
                  onChange={handleChange}
                  placeholder="35000"
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

              {/* Interest Rate Input */}
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
                  <PercentIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    INTEREST RATE (%)
                  </span>
                </div>
                <input
                  type="number"
                  name="interest_rate"
                  value={formData.interest_rate}
                  onChange={handleChange}
                  placeholder="4.5"
                  step="0.1"
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

              {/* Loan Term Input */}
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
                    LOAN TERM (MONTHS)
                  </span>
                </div>
                <input
                  type="number"
                  name="loan_term"
                  value={formData.loan_term}
                  onChange={handleChange}
                  placeholder="48"
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

              {/* Age Input */}
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
                  <UserIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    AGE
                  </span>
                </div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="35"
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
              {loading ? 'Analyzing Risk...' : 'Get Risk Assessment'}
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

export default LoanRiskPredictor;