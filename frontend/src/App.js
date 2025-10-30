import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home'; // <-- NEW IMPORT

// Assuming these files are correctly named and located in the /screens directory
import HomePage from './screens/HomePage'; // <-- NEW IMPORT
import LoanRiskPredictor from './screens/LoanRiskPredictor';
import FraudScoringTool from './screens/FraudScoringTool';
import SegmentFinder from './screens/SegmentFinder';
import AnalyticsDashboard from './screens/AnalyticsDashboard';

// Custom dark mode theme for the header
const HeaderStyle = {
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', // Deep blue gradient
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
};

// --- Main App Component ---
function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f7f9' }}> {/* Light background for the content area */}
        <AppBar position="static" sx={HeaderStyle}>
          <Toolbar>
            <AccountBalanceIcon sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: '700', letterSpacing: '1px' }}>
             Intelligence Dashboard
            </Typography>
            
            {/* NEW BUTTON: Home */}
            <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />} sx={{ fontWeight: 'bold' }}>
              Home
            </Button>
            
            {/* Analytics Dashboard Button */}
            <Button color="inherit" component={Link} to="/analytics" startIcon={<AnalyticsIcon />} sx={{ fontWeight: 'bold' }}>
              Dashboard
            </Button>
            
            <Button color="inherit" component={Link} to="/loan-risk" startIcon={<DashboardIcon />} sx={{ fontWeight: 'bold' }}>
              Loan Risk
            </Button>
            <Button color="inherit" component={Link} to="/fraud" startIcon={<SecurityIcon />} sx={{ fontWeight: 'bold' }}>
              Fraud Scoring
            </Button>
            <Button color="inherit" component={Link} to="/segment" startIcon={<TrendingUpIcon />} sx={{ fontWeight: 'bold' }}>
              Segment Finder
            </Button>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
          <Routes>
            {/* NEW ROUTE: Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Analytics Dashboard */}
            <Route path="/analytics" element={<AnalyticsDashboard />} /> 
            
            {/* Updated Loan Risk path */}
            <Route path="/loan-risk" element={<LoanRiskPredictor />} />
            <Route path="/fraud" element={<FraudScoringTool />} />
            <Route path="/segment" element={<SegmentFinder />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;