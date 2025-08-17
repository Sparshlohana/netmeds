// Admin/Views/Admin.jsx

import React from 'react';
import { 
  Box, Card, Typography, TextField, Button, Checkbox, FormControlLabel 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ✅ Styled component for the search/filter container (mobile-friendly)
const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1b1b36',
  borderRadius: '8px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '20px',
  border: '1px solid #333',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

// ✅ Styled button for the top-right buttons (Order Now, Settings)
const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '10px',
  padding: '8px 16px',
  color: 'white',
  backgroundColor: '#2e2e4f',
  '&:hover': {
    backgroundColor: '#3b3b5e',
  },
}));

// ✅ Main component for the "Stock on hand" page
const Admin = () => {
  return (
    <Box sx={{ p: 2, color: 'white', minHeight: 'calc(100vh - 64px)' }}>
      <Grid container spacing={2}>
        
        {/* Left Section - Stock on hand */}
        <Grid 
          item xs={12} md={4} 
          sx={{ 
            height: { xs: 'auto', md: '75vh' }, // ✅ responsive height
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          <Card sx={{
            backgroundColor: '#0d0d1a',
            height: '100%',
            p: 3,
            boxShadow: 'none',
            border: '1px solid #2e2e4f',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>Stock on hand</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>SKU: 0</Typography>
            </Box>

            {/* Search and Filter Group */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>Search | Filter | Sort ▼</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Button
                  startIcon={<FilterListIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ color: '#A0A0A0', textTransform: 'none', borderColor: '#444', flex: 1 }}
                  variant="outlined"
                >
                  FILTER BY
                </Button>
                <Button
                  startIcon={<SortIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ color: '#A0A0A0', textTransform: 'none', borderColor: '#444', flex: 1 }}
                  variant="outlined"
                >
                  SORT BY
                </Button>
              </Box>
              <SearchContainer>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'gray', fontWeight: 'bold' }}>PRODUCT</Typography>
                  <KeyboardArrowDownIcon sx={{ color: 'gray' }} />
                </Box>
                <TextField
                  variant="standard"
                  placeholder="Search for Pharma Products"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    sx: { color: 'white', '&::placeholder': { color: 'gray' } },
                  }}
                />
                <SearchIcon sx={{ color: 'gray' }} />
              </SearchContainer>
            </Box>
            
            {/* Empty State */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                textAlign: 'center',
                mb: 3,
              }}
            >
              <img
                src="/images/emptyCart.png"
                alt="Empty stock illustration"
                style={{ width: '100%', maxWidth: '250px' }}
              />
              <Typography variant="body2" sx={{ color: 'gray', mt: 2 }}>
                We've Plenty Of Space For Your Data, We Promise!
              </Typography>
            </Box>
            
            {/* Add New Item Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f06292',
                  '&:hover': { backgroundColor: '#c8507a' },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1.5
                }}
                startIcon={<AddCircleOutlineIcon />}
              >
                Add New Item
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Right Section - Stock Details and Add Batch */}
        <Grid 
          item xs={12} md={8} 
          sx={{ 
            height: { xs: 'auto', md: '75vh' }, // ✅ responsive height
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          {/* Header Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              mb: 3, 
              flexWrap: 'wrap' 
            }}
          >
              {/* Add Composition */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', mb: { xs: 2, md: 0 } }}>
                <img src="/images/tree.png" alt="tree icon" style={{ width: '60px' }} />
                <Typography variant="body2" sx={{ color: 'gray', mt: 1, textDecoration: 'underline' }}>Add Composition</Typography>
              </Box>
              
              {/* Action Buttons + Checkbox */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                  <ActionButton size="small">Order Now (F2)</ActionButton>
                  <ActionButton size="small">Settings (F4)</ActionButton>
                </Box>
                <FormControlLabel
                  control={<Checkbox sx={{ color: 'gray' }} />}
                  label="Show Zero Qty Batches"
                  sx={{ color: 'gray', textAlign: 'left' }}
                />
              </Box>
          </Box>

          {/* Card Section */}
          <Card sx={{
            backgroundColor: '#0d0d1a',
            height: '100%',
            p: 3,
            boxShadow: 'none',
            border: '1px solid #2e2e4f',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Table Header (scrollable on mobile) */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                mb: 3,
                borderBottom: '1px solid #444',
                overflowX: { xs: 'auto', md: 'visible' },
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {["BATCH NO","PACK","EXPIRY","STATUS","MRP","PURC RATE","NET RATE","SALE RATE","STOCK QTY"].map((label, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  sx={{ 
                    minWidth: '80px',
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: { xs: '12px', md: '14px' },
                    mb: { xs: 1, md: 0 }
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>

            {/* Empty State */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                textAlign: 'center',
                mb: 3,
              }}
            >
              <img
                src="/images/emptyCart.png"
                alt="Empty stock illustration 2"
                style={{ width: '100%', maxWidth: '250px' }}
              />
              <Typography variant="body2" sx={{ color: 'gray', mt: 2 }}>
                We've Plenty Of Space For Your Data, We Promise!
              </Typography>
            </Box>

            {/* Add New Batch Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f06292',
                  '&:hover': { backgroundColor: '#c8507a' },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1.5
                }}
                startIcon={<AddCircleIcon />}
              >
                Add New Batch
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
