// tables/CustomerOrders.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NewCustomerOrderModal from '../componets/Orders/NewCustomerOrderModal'; // Corrected path

// Mock data with new customer names
const mockOrders = [
  { patientName: 'Arjun Verma', orderNo: 'ORD001', source: 'Online', fulfillment: 'Pending', created: '2025-07-15', age: 35, ordStatus: 'New', updated: '2025-07-15', skus: 5, forBilling: 'Yes', amount: 1500 },
  { patientName: 'Priya Sharma', orderNo: 'ORD002', source: 'Offline', fulfillment: 'Shipped', created: '2025-07-14', age: 42, ordStatus: 'Processing', updated: '2025-07-16', skus: 8, forBilling: 'No', amount: 2500 },
  { patientName: 'Rahul Kapoor', orderNo: 'ORD003', source: 'Online', fulfillment: 'Delivered', created: '2025-07-13', age: 28, ordStatus: 'Completed', updated: '2025-07-17', skus: 3, forBilling: 'Yes', amount: 800 },
  { patientName: 'Deepa Singh', orderNo: 'ORD004', source: 'Offline', fulfillment: 'Pending', created: '2025-07-12', age: 55, ordStatus: 'New', updated: '2025-07-12', skus: 10, forBilling: 'Yes', amount: 3200 },
  { patientName: 'Sanjay Dutt', orderNo: 'ORD005', source: 'Online', fulfillment: 'Pending', created: '2025-07-11', age: 60, ordStatus: 'New', updated: '2025-07-11', skus: 6, forBilling: 'No', amount: 1200 },
];

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

const PromoteButton = styled(ActionButton)({
  backgroundColor: '#f06292',
  '&:hover': {
    backgroundColor: '#c8507a',
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: 'white',
    backgroundColor: '#1b1b36',
    borderRadius: '8px',
    border: '1px solid #333',
    paddingLeft: theme.spacing(1),
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f06292',
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px',
    color: 'white',
  },
  '& .MuiInputAdornment-root': {
    color: 'gray',
  },
}));

const StyledDateInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1b1b36',
  borderRadius: '8px',
  border: '1px solid #333',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  gap: '4px',
  '&:hover': {
    borderColor: '#555',
  },
  '&:focus-within': {
    borderColor: '#f06292',
  },
}));

const StyledDateTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    '& fieldset': {
      borderColor: 'transparent',
    },
  },
  '& input[type="date"]': {
    padding: '10px 0',
    color: 'white',
    width: '100px',
  },
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
}));

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2025-07-12');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (searchTerm) {
      result = result.filter(order =>
        order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(order => {
        const orderDate = new Date(order.created);
        return orderDate >= start && orderDate <= end;
      });
    }
    return result;
  }, [orders, searchTerm, startDate, endDate]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setSearchTerm('');
      setStartDate('2025-07-12');
      setEndDate('2025-08-12');
      setLoading(false);
    }, 500);
  };
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const EmptyStateIllustration = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        textAlign: 'center',
        py: 4,
      }}
    >
      <img
        src="/images/emptyCart.png" 
        alt="Empty data illustration"
        style={{ width: '100%', maxWidth: '300px', opacity: 0.8 }}
      />
      <Typography variant="body1" sx={{ color: 'gray', mt: 2 }}>
        No data
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" component="h1" sx={{ mr: 1, fontWeight: 'bold' }}>Customer Orders</Typography>
              <Button onClick={handleRefresh} sx={{ textTransform: 'none', color: '#f06292', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
                  <RefreshIcon sx={{ mr: 0.5 }} /> Refresh
              </Button>
          </Box>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            List of Online & Offline Customer Orders
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={handleOpenModal}>
              Add New Order (F2)
            </ActionButton>
            <PromoteButton startIcon={<AddIcon />} onClick={() => console.log('Promote MedCart')}>
              Promote MedCart
            </PromoteButton>
          </Box>
          <Button 
            variant="text" 
            sx={{ color: '#f06292', textTransform: 'none', fontSize: '0.8rem', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}
            onClick={() => console.log('Add short items')}
          >
            + ADD SHORT ITEMS TO CART IN BULK
          </Button>
        </Box>
      </Box>

      {/* Search and Date Filter */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
        <StyledTextField
          placeholder="Search by Patient or Order No"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '250px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="body2" sx={{ color: 'white', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
          CREATED BETWEEN
        </Typography>
        <StyledDateInputContainer>
          <StyledDateTextField
            type="date"
            variant="standard"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Typography sx={{ color: 'white' }}>-</Typography>
          <StyledDateTextField
            type="date"
            variant="standard"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <CalendarTodayIcon sx={{ color: 'gray' }} />
        </StyledDateInputContainer>
      </Box>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'gray' }}>Loading orders...</Typography>
          </Box>
        ) : filteredOrders.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={tableHeaderStyle}>PATIENT NAME</th>
                  <th style={tableHeaderStyle}>ORDER NO</th>
                  <th style={tableHeaderStyle}>SOURCE</th>
                  <th style={tableHeaderStyle}>FULFILLMENT</th>
                  <th style={tableHeaderStyle}>CREATED</th>
                  <th style={tableHeaderStyle}>AGE</th>
                  <th style={tableHeaderStyle}>ORD STATUS</th>
                  <th style={tableHeaderStyle}>UPDATED</th>
                  <th style={tableHeaderStyle}>SKUs</th>
                  <th style={tableHeaderStyle}>FOR BILLING?</th>
                  <th style={tableHeaderStyle}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #2e2e4f' }}>
                    <td style={tableCellStyle}>{order.patientName}</td>
                    <td style={tableCellStyle}>{order.orderNo}</td>
                    <td style={tableCellStyle}>{order.source}</td>
                    <td style={tableCellStyle}>{order.fulfillment}</td>
                    <td style={tableCellStyle}>{order.created}</td>
                    <td style={tableCellStyle}>{order.age}</td>
                    <td style={tableCellStyle}>{order.ordStatus}</td>
                    <td style={tableCellStyle}>{order.updated}</td>
                    <td style={tableCellStyle}>{order.skus}</td>
                    <td style={tableCellStyle}>{order.forBilling}</td>
                    <td style={tableCellStyle}>${order.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <EmptyStateIllustration />
        )}
      </Card>
      
      {/* New Customer Order Modal */}
      <NewCustomerOrderModal open={isModalOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default CustomerOrders;

const tableHeaderStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: '600',
  color: 'gray',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const tableCellStyle = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: 'white',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};