import React, { useState } from 'react';

// SVG Icons as components
const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
);

const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const ShieldAlertIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

const API_URL = "http://127.0.0.1:8000/predict/anomaly";

const FraudScoringTool = () => {
  const [formData, setFormData] = useState({
    transaction_amount: 500.0,
    account_balance_after_transaction: 10000.0,
    credit_card_balance: 1000.0,
    rewards_points: 50.0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      const testData = {
        transaction_amount: formData.transaction_amount,
        account_balance_after_transaction: formData.account_balance_after_transaction,
        credit_card_balance: formData.credit_card_balance,
        rewards_points: formData.rewards_points
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to get anomaly score from the server.");
    } finally {
      setLoading(false);
    }
  };

  const renderPrediction = () => {
    if (!prediction) return null;

    const isFlagged = prediction.is_flagged;
    let cardColor, accentColor, borderColor, iconBg, Icon, alertTitle;

    if (isFlagged) {
      cardColor = 'linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%)';
      accentColor = '#c62828';
      borderColor = '#f44336';
      iconBg = '#ffebee';
      Icon = ShieldAlertIcon;
      alertTitle = 'FRAUD ALERT: FLAG FOR REVIEW';
    } else {
      cardColor = 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)';
      accentColor = '#2e7d32';
      borderColor = '#4caf50';
      iconBg = '#e8f5e9';
      Icon = ShieldCheckIcon;
      alertTitle = 'Normal Transaction';
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
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: iconBg,
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              color: accentColor
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
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
              {isFlagged ? 'HIGH RISK DETECTED' : 'TRANSACTION VERIFIED'}
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: accentColor,
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {alertTitle}
            </h2>
          </div>

          <div style={{
            padding: '24px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#666',
                letterSpacing: '0.5px'
              }}>
                ANOMALY SCORE
              </span>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: accentColor
              }}>
                {prediction.anomaly_score}
              </span>
            </div>
            <div style={{
              height: '8px',
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(prediction.anomaly_score, 100)}%`,
                background: accentColor,
                transition: 'width 1s ease-out',
                borderRadius: '4px'
              }} />
            </div>
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
              <strong style={{ color: accentColor }}>Message:</strong> {prediction.alert_message}
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
              (Lower score indicates higher anomaly)
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e53935 0%, #d32f2f 50%, #c62828 100%)',
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
              background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>
              Real-Time Fraud Scoring
            </h1>
            <p style={{
              color: '#666',
              fontWeight: 500,
              letterSpacing: '1px',
              fontSize: '1.125rem'
            }}>
              Advanced Anomaly Detection System
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Transaction Amount */}
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
                e.currentTarget.style.borderColor = '#e53935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#e53935' }}>
                  <DollarIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    TRANSACTION AMOUNT
                  </span>
                </div>
                <input
                  type="number"
                  name="transaction_amount"
                  value={formData.transaction_amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
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
                  onFocus={(e) => e.target.style.borderColor = '#e53935'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              {/* Account Balance */}
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
                e.currentTarget.style.borderColor = '#e53935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#e53935' }}>
                  <WalletIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    ACCOUNT BALANCE
                  </span>
                </div>
                <input
                  type="number"
                  name="account_balance_after_transaction"
                  value={formData.account_balance_after_transaction}
                  onChange={handleChange}
                  placeholder="Balance after transaction"
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
                  onFocus={(e) => e.target.style.borderColor = '#e53935'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              {/* Credit Card Balance */}
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
                e.currentTarget.style.borderColor = '#e53935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#e53935' }}>
                  <CreditCardIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    CREDIT CARD BALANCE
                  </span>
                </div>
                <input
                  type="number"
                  name="credit_card_balance"
                  value={formData.credit_card_balance}
                  onChange={handleChange}
                  placeholder="Current balance"
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
                  onFocus={(e) => e.target.style.borderColor = '#e53935'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              {/* Rewards Points */}
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
                e.currentTarget.style.borderColor = '#e53935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#e53935' }}>
                  <AwardIcon />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginLeft: '8px' }}>
                    REWARDS POINTS
                  </span>
                </div>
                <input
                  type="number"
                  name="rewards_points"
                  value={formData.rewards_points}
                  onChange={handleChange}
                  placeholder="Available points"
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
                  onFocus={(e) => e.target.style.borderColor = '#e53935'}
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
                background: loading ? '#ccc' : 'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
                border: 'none',
                borderRadius: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(229, 57, 53, 0.4)',
                transition: 'all 0.3s ease',
                textTransform: 'none'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(229, 57, 53, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(229, 57, 53, 0.4)';
                }
              }}
            >
              {loading ? 'Analyzing Transaction...' : 'Run Anomaly Check'}
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

export default FraudScoringTool;