// tables/Orderbook.jsx

import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, styled, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Mock Data
const mockSummaryData = {
  shortbookItems: 120,
  distributors: 172,
  itemsInCart: 0,
  orderedItems: 0,
  orderAnalysis: 0,
};

const mockLocalDistributors = [
  { id: 1, name: 'Tallyjoy Distributors', address: 'Shop No. 2, Amb...', orderLink: '#' },
  { id: 2, name: 'Om Medical Agencies', address: 'Shop No. 10, Med...', orderLink: '#' },
  { id: 3, name: 'JOT Distributors', address: '13 & 14, Kabe...', orderLink: '#' },
  { id: 4, name: 'Janki Pharma Distributors', address: 'JA, Vijay Nagar...', orderLink: '#' },
  { id: 5, name: 'MediCare Pharma', address: 'Unit 5, Pharma...', orderLink: '#' },
];

const mockPopularBrands = [
  { id: 1, name: 'Cipla', logo: 'https://placehold.co/60x30/5e35b1/FFFFFF?text=Cipla' },
  { id: 2, name: 'SUN PHARMA', logo: 'https://placehold.co/60x30/f06292/FFFFFF?text=SUN' },
  { id: 3, name: 'Mankind', logo: 'https://placehold.co/60x30/424242/FFFFFF?text=Mankind' },
  { id: 4, name: 'ALKEM', logo: 'https://placehold.co/60x30/5e35b1/FFFFFF?text=ALKEM' },
  { id: 5, name: 'Intas', logo: 'https://placehold.co/60x30/f06292/FFFFFF?text=Intas' },
  { id: 6, name: 'Dr. Reddy\'s', logo: 'https://placehold.co/60x30/424242/FFFFFF?text=Reddy' },
];

const mockCategories = [
  { id: 1, name: 'Medication', icon: '💊' },
  { id: 2, name: 'Ayurvedic Care', icon: '🌿' },
  { id: 3, name: 'Beauty & Skin Care', icon: '🧴' },
  { id: 4, name: 'Personal Care & Hygiene', icon: '🧼' },
  { id: 5, name: 'Mother & Baby Care', icon: '👶' },
  { id: 6, name: 'Food & Nutrition', icon: '🍎' },
  { id: 7, name: 'Sexual Wellness', icon: '❤️‍🔥' },
  { id: 8, name: 'Devices', icon: '🩺' },
];


const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1b1b36',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #2e2e4f',
  color: 'white',
}));

const SummaryCard = styled(StyledCard)(({ theme, color }) => ({
  backgroundColor: color,
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100px',
  textAlign: 'center', // Centered text for the whole card
  alignItems: 'center', // Center items horizontally in column
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '10px 20px',
  color: 'white',
  backgroundColor: '#5e35b1',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#4527a0',
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
  },
}));

const Orderbook = () => {
  const [summaryData, setSummaryData] = useState(mockSummaryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setLoading(true);
    setTimeout(() => {
      setSummaryData(mockSummaryData); // In a real app, this would be fetched from an API
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: 'gray' }}>Loading Orderbook...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Orderbook Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ color: '#f06292', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
            <InfoOutlinedIcon sx={{ mr: 0.5 }} /> How to Use Orderbook?
          </Button>
          <Button sx={{ color: 'gray', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.1)' } }}>
            <SettingsOutlinedIcon sx={{ mr: 0.5 }} /> Shortbook Settings (F2)
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        List of stock products which are in shortage
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 4 }}>
        <SummaryCard color="#5e35b1"> {/* Purple */}
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold' }}>Shortbook Items</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.shortbookItems}</Typography> {/* Increased font size and bold */}
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>Stock items in Shortage</Typography>
        </SummaryCard>
        <SummaryCard color="#f06292"> {/* Pink */}
          <Typography variant="body2" sx={{ opacity: 0.8 , fontWeight: 'bold'}}>Distributors</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.distributors}</Typography> {/* Increased font size and bold */}
          <Typography variant="caption" sx={{ opacity: 0.7 }}>Whom to Order from</Typography>
        </SummaryCard>
        <SummaryCard color="#4CAF50"> {/* Green */}
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold' }}>Items in Cart</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.itemsInCart}</Typography> {/* Increased font size and bold */}
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>Items Finalized for Order</Typography>
        </SummaryCard>
        <SummaryCard color="Brown"> {/* Amber */}
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold' }}>Ordered Items</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.orderedItems}</Typography> {/* Increased font size and bold */}
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>Items that are in Order</Typography>
        </SummaryCard>
        <SummaryCard color="#2196F3"> {/* Blue */}
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold'}}>Order Analysis</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.orderAnalysis}</Typography> {/* Increased font size and bold */}
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>Analyze fulfillment status</Typography>
        </SummaryCard>
      </Box>

      {/* Local Distributors */}
      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Local Distributors</Typography>
          <Button sx={{ color: '#f06292', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
            View All <ArrowForwardIosIcon sx={{ fontSize: 'small', ml: 0.5 }} />
          </Button>
        </Box>
        <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>List of all distributors from your locality</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#424242', borderRadius: '4px' } }}>
          {mockLocalDistributors.map(dist => (
            <Card key={dist.id} sx={{ minWidth: 200, mr: 2, p: 2, backgroundColor: '#0d0d1a', border: '1px solid #2e2e4f', borderRadius: '8px', flexShrink: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>{dist.name}</Typography>
              <Typography variant="caption" sx={{ color: 'gray', mb: 1, display: 'block' }}>{dist.address}</Typography>
              <Button size="small" sx={{ color: '#f06292', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
                Order Now <ArrowForwardIosIcon sx={{ fontSize: 'small', ml: 0.5 }} />
              </Button>
            </Card>
          ))}
        </Box>
      </StyledCard>

      {/* Popular Brands */}
      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Popular Brands</Typography>
        <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>List of all brands from the Pharmacies</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#424242', borderRadius: '4px' } }}>
          {mockPopularBrands.map(brand => (
            <Card key={brand.id} sx={{ minWidth: 120, height: 80, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d0d1a', border: '1px solid #2e2e4f', borderRadius: '8px', flexShrink: 0 }}>
              <img src={brand.logo} alt={brand.name} style={{ maxWidth: '80%', maxHeight: '60%', objectFit: 'contain' }} />
            </Card>
          ))}
        </Box>
      </StyledCard>

      {/* Categories */}
      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Categories</Typography>
        <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>List of all products from the Pharmacies Categories</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 2 }}>
          {mockCategories.map(category => (
            <Card key={category.id} sx={{ p: 2, backgroundColor: '#0d0d1a', border: '1px solid #2e2e4f', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 1 }}>{category.icon}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{category.name}</Typography>
            </Card>
          ))}
        </Box>
      </StyledCard>

      {/* Keyboard Shortcuts Hint */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', color: 'gray' }}>
          Add Customer Order - F2 | To Select - Up or Down Key | To Open - Enter | To Go Ahead - Enter | To Go Back - Shift + Tab | To Close - ESC
        </Typography>
      </Box>
    </Box>
  );
};

export default Orderbook;
