// tables/PatientFollowups.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

// Mock data for follow-ups
const mockFollowups = [
  { id: 1, name: 'Arjun Verma', type: 'Arriving', firstSale: '2025-07-01', contact: '9876543210', address: '123 Main St', overdue: false },
  { id: 2, name: 'Priya Sharma', type: 'Arriving', firstSale: '2025-07-05', contact: '9123456789', address: '456 Oak Ave', overdue: false },
  { id: 3, name: 'Rahul Kapoor', type: 'Expired', firstSale: '2025-06-15', contact: '9988776655', address: '789 Pine Ln', overdue: true },
  { id: 4, name: 'Deepa Singh', type: 'Arriving', firstSale: '2025-07-10', contact: '9012345678', address: '101 Maple Rd', overdue: false },
  { id: 5, name: 'Sanjay Dutt', type: 'Expired', firstSale: '2025-06-20', contact: '9345678901', address: '202 Birch Dr', overdue: true },
];

const StyledCard = styled(Card)({
  backgroundColor: '#1b1b36',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #2e2e4f',
  height: '100%',
});

const FollowupItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid #2e2e4f',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(240, 98, 146, 0.1)',
  },
});

const FollowupList = styled(Box)({
  maxHeight: '400px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#1b1b36',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#424242',
    borderRadius: '2px',
  },
});

const PatientFollowups = () => {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFollowup, setSelectedFollowup] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFollowups(mockFollowups);
      setLoading(false);
    }, 500);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedFollowup(null); // Clear selected followup when changing tabs
  };

  const filteredFollowups = useMemo(() => {
    let result = [...followups];
    const statusFilter = ['Arriving', 'Expired'][activeTab];

    result = result.filter(f => f.type === statusFilter);

    if (searchTerm) {
      result = result.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [followups, activeTab, searchTerm]);

  const handleSelectFollowup = (followup) => {
    setSelectedFollowup(followup);
  };

  const EmptyState = () => (
    <Box sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="body1" sx={{ color: 'gray' }}>
        No Followups Found!
      </Typography>
    </Box>
  );

  const NoEntriesFound = () => (
    <Box sx={{ textAlign: 'center', py: 5, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="body1" sx={{ color: 'gray' }}>
        No Entries Found!
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
        PATIENT FOLLOW-UPS
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        Start building relationship with your customers
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 3, height: '100%' }}>
        
        {/* Left Card: Follow-up List */}
        <StyledCard sx={{ p: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{
              mb: 2,
              '& .MuiTab-root': { color: 'gray', fontWeight: 'bold' },
              '& .Mui-selected': { color: '#f06292 !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#f06292' },
            }}
          >
            <Tab label="Arriving" />
            <Tab label="Expired" />
          </Tabs>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#f06292', fontWeight: 'bold' }}>
              Search | Filter | Sort
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              select
              variant="outlined"
              size="small"
              value=""
              label="FILTER BY"
              sx={{ flexGrow: 1, backgroundColor: '#0d0d1a', '& fieldset': { borderColor: '#333' } }}
            //   InputProps={{ startAdornment: (<InputAdornment position="start"><FilterListIcon sx={{ color: 'gray' }} /></InputAdornment>) }}
            />
            <TextField
              select
              variant="outlined"
              size="small"
              value=""
              label="SORT BY"
              sx={{ flexGrow: 1, backgroundColor: '#0d0d1a', '& fieldset': { borderColor: '#333' } }}
            //   InputProps={{ startAdornment: (<InputAdornment position="start"><SortIcon sx={{ color: 'gray' }} /></InputAdornment>) }}
            />
          </Box>
          
          <TextField
            placeholder="Search Customer using Name or Contacts"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'gray' }} />
                </InputAdornment>
              ),
              sx: { backgroundColor: '#0d0d1a', border: '1px solid #333', color: 'white', '& input': { color: 'white' } },
            }}
          />

          <Box sx={{ mt: 2 }}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="body1" sx={{ color: 'gray' }}>Loading...</Typography>
              </Box>
            ) : filteredFollowups.length > 0 ? (
              <FollowupList>
                {filteredFollowups.map((followup) => (
                  <FollowupItem 
                    key={followup.id} 
                    onClick={() => handleSelectFollowup(followup)}
                    sx={{ backgroundColor: selectedFollowup?.id === followup.id ? 'rgba(240, 98, 146, 0.2)' : 'transparent' }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{followup.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'gray' }}>First Sale: {followup.firstSale}</Typography>
                    </Box>
                    {followup.overdue && (
                      <Typography variant="body2" sx={{ color: '#f06292', fontWeight: 'bold' }}>Overdue</Typography>
                    )}
                  </FollowupItem>
                ))}
              </FollowupList>
            ) : (
              <EmptyState />
            )}
          </Box>
        </StyledCard>

        {/* Right Card: Customer Details */}
        <StyledCard sx={{ display: 'flex', flexDirection: 'column', p: 3, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {selectedFollowup ? (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 60, height: 60, bgcolor: 'gray', borderRadius: 1, mr: 2 }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{selectedFollowup.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>First Sale: {selectedFollowup.firstSale}</Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>Contact: {selectedFollowup.contact}</Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>Address: {selectedFollowup.address}</Typography>
                    <Button 
                      onClick={() => console.log('View Sales History')} 
                      sx={{ color: '#f06292', textTransform: 'none', p: 0, mt: 1, '&:hover': { backgroundColor: 'transparent' } }}
                    >
                      View Sales History 
                    </Button>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#5e35b1', color: 'white', textTransform: 'none', fontWeight: 'bold' }}
                  onClick={() => console.log('Edit Customer')}
                >
                  Edit Customer
                </Button>
              </Box>
            </Box>
          ) : (
            <NoEntriesFound />
          )}
        </StyledCard>
      </Box>
    </Box>
  );
};

export default PatientFollowups;