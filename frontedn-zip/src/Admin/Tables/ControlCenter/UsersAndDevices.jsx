// tables/ControlCenter/UsersAndDevices.jsx

import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, Grid, styled } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1b1b36',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #2e2e4f',
  color: 'white',
  p: 3,
}));

const UserCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#0d0d1a',
  borderRadius: '8px',
  border: '1px solid #2e2e4f',
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '100%',
  alignItems: 'center', // Center items horizontally in column
  textAlign: 'center',  // Center text within the card
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

const UsersAndDevices = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: 'gray' }}>Loading Users & Devices...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: 'gray', textTransform: 'none', mr: 1 }}>
            <ArrowBackIosIcon sx={{ fontSize: 'small' }} />
          </Button>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Users & Devices
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ActionButton onClick={() => console.log('Buy More Logins')} sx={{ backgroundColor: '#f06292', '&:hover': { backgroundColor: '#c8507a' } }}>
            Buy More Logins
          </ActionButton>
          <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => console.log('Add New User')}>
            Add New User (F2)
          </ActionButton>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        View, Add & Manage users & their devices from one place
      </Typography>

      <StyledCard>
        <Grid container spacing={3}>
          {/* Owner Card */}
          <Grid item xs={12} sm={6} md={4}>
            <UserCard>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Owner</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}> {/* Centered content */}
                <PersonOutlineIcon sx={{ color: 'gray' }} />
                <Typography variant="body2">Harsh</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'gray' }}>987654321</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>harsh@outlook.com</Typography>
              <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#1b1b36', borderRadius: '4px', border: '1px solid #2e2e4f', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Web Login <span style={{ color: 'gray', fontWeight: 'normal' }}>(This Device)</span></Typography>
                <Typography variant="caption" sx={{ color: 'gray' }}>5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...</Typography>
                <Typography variant="caption" sx={{ color: 'gray', display: 'block' }}>1 minutes ago</Typography>
              </Box>
            </UserCard>
          </Grid>

          {/* Admin Card */}
          <Grid item xs={12} sm={6} md={4}>
            <UserCard>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admin</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}> {/* Centered content */}
                <PersonOutlineIcon sx={{ color: 'gray' }} />
                <Typography variant="body2">Test User</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'gray' }}>890398989</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>testuser@outlook.com</Typography>
              <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#1b1b36', borderRadius: '4px', border: '1px solid #2e2e4f', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Web Login <span style={{ color: 'gray', fontWeight: 'normal' }}>(This Device)</span></Typography>
                <Typography variant="caption" sx={{ color: 'gray' }}>5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...</Typography>
                <Typography variant="caption" sx={{ color: 'gray', display: 'block' }}>1 minutes ago</Typography>
              </Box>
            </UserCard>
          </Grid>

          {/* "2 More Mobile Logins Available" */}
          <Grid item xs={12} md={4}>
            <Box sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0d0d1a',
                borderRadius: '8px',
                border: '1px dashed #2e2e4f',
                p: 2,
                textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ color: 'gray', fontWeight: 'bold' }}>
                2 More Mobile Logins Available
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledCard>
    </Box>
  );
};

export default UsersAndDevices;
