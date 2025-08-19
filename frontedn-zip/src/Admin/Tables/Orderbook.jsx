// tables/Orderbook.jsx

import React, { useState, useEffect, Fragment } from 'react';
import { Box, Card, Typography, Button, styled, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { green } from '@mui/material/colors';


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
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #E0E0E0',
  color: 'black',
}));

const SummaryCard = styled(StyledCard)(({ theme, color }) => ({
  backgroundColor: color,
  color: 'white',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100px',
  textAlign: 'center',
  alignItems: 'center',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '10px 20px',
  color: 'white',
  backgroundColor: green[600],
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: green[700],
    transform: 'translateY(-2px)',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
}));

const Orderbook = () => {
  const [summaryData, setSummaryData] = useState(mockSummaryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSummaryData(mockSummaryData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#616161' }}>Loading Orderbook...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>
          Orderbook Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ color: green[600], textTransform: 'none', '&:hover': { backgroundColor: green[100] } }}>
            <InfoOutlinedIcon sx={{ mr: 0.5 }} /> How to Use Orderbook?
          </Button>
          <Button sx={{ color: '#444', textTransform: 'none', '&:hover': { backgroundColor: '#F0F0F0' } }}>
            <SettingsOutlinedIcon sx={{ mr: 0.5 }} /> Shortbook Settings (F2)
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: '#616161', mb: 3 }}>
        List of stock products which are in shortage
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 4 }}>
        <SummaryCard color={green[700]}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold' }}>Shortbook Items</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.shortbookItems}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>Stock items in Shortage</Typography>
        </SummaryCard>
        <SummaryCard color={green[500]}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold' }}>Distributors</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.distributors}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>Whom to Order from</Typography>
        </SummaryCard>
        <SummaryCard color={green[300]}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold' }}>Items in Cart</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{summaryData.itemsInCart}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>Items Finalized for Order</Typography>
        </SummaryCard>
        <SummaryCard color={green[200]}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold', color: 'black' }}>Ordered Items</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem', color: 'black' }}>{summaryData.orderedItems}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold', color: 'black' }}>Items that are in Order</Typography>
        </SummaryCard>
        <SummaryCard color={green[100]}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 'bold', color: 'black' }}>Order Analysis</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem', color: 'black' }}>{summaryData.orderAnalysis}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold', color: 'black' }}>Analyze fulfillment status</Typography>
        </SummaryCard>
      </Box>

      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>Local Distributors</Typography>
          <Button sx={{ color: green[600], textTransform: 'none', '&:hover': { backgroundColor: green[100] } }}>
            View All <ArrowForwardIosIcon sx={{ fontSize: 'small', ml: 0.5 }} />
          </Button>
        </Box>
        <Typography variant="body2" sx={{ color: '#616161', mb: 2 }}>List of all distributors from your locality</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#BDBDBD', borderRadius: '4px' } }}>
          {mockLocalDistributors.map(dist => (
            <Card key={dist.id} sx={{ minWidth: 200, mr: 2, p: 2, backgroundColor: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '8px', flexShrink: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'darkgreen', mb: 1 }}>{dist.name}</Typography>
              <Typography variant="caption" sx={{ color: '#616161', mb: 1, display: 'block' }}>{dist.address}</Typography>
              <Button size="small" sx={{ color: green[600], textTransform: 'none', '&:hover': { backgroundColor: green[100] } }}>
                Order Now <ArrowForwardIosIcon sx={{ fontSize: 'small', ml: 0.5 }} />
              </Button>
            </Card>
          ))}
        </Box>
      </StyledCard>

      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'darkgreen', mb: 2 }}>Popular Brands</Typography>
        <Typography variant="body2" sx={{ color: '#616161', mb: 2 }}>List of all brands from the Pharmacies</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2, '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#BDBDBD', borderRadius: '4px' } }}>
          {mockPopularBrands.map(brand => (
            <Card key={brand.id} sx={{ minWidth: 120, height: 80, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '8px', flexShrink: 0 }}>
              <img src={brand.logo} alt={brand.name} style={{ maxWidth: '80%', maxHeight: '60%', objectFit: 'contain' }} />
            </Card>
          ))}
        </Box>
      </StyledCard>

      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'darkgreen', mb: 2 }}>Categories</Typography>
        <Typography variant="body2" sx={{ color: '#616161', mb: 2 }}>List of all products from the Pharmacies Categories</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 2 }}>
          {mockCategories.map(category => (
            <Card key={category.id} sx={{ p: 2, backgroundColor: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 1 }}>{category.icon}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>{category.name}</Typography>
            </Card>
          ))}
        </Box>
      </StyledCard>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', color: '#616161' }}>
          Add Customer Order - F2 | To Select - Up or Down Key | To Open - Enter | To Go Ahead - Enter | To Go Back - Shift + Tab | To Close - ESC
        </Typography>
      </Box>
    </Box>
  );
};

export default Orderbook;