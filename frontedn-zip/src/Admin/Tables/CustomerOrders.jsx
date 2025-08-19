// tables/CustomerOrders.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NewCustomerOrderModal from '../componets/Orders/NewCustomerOrderModal';
import { green } from '@mui/material/colors';

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
  backgroundColor: green[600],
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: green[700],
    transform: 'translateY(-2px)',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
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
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    paddingLeft: theme.spacing(1),
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD',
    },
    '&.Mui-focused fieldset': {
      borderColor: green[500],
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px',
    color: 'black',
  },
  '& .MuiInputAdornment-root': {
    color: '#757575',
  },
}));

const StyledDateInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  gap: '4px',
  '&:hover': {
    borderColor: '#BDBDBD',
  },
  '&:focus-within': {
    borderColor: green[500],
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
    color: 'black',
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Typography variant="body1" sx={{ color: '#616161', mt: 2 }}>
        No data
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="h1" sx={{ mr: 1, fontWeight: 'bold', color: 'darkgreen' }}>Customer Orders</Typography>
            <Button onClick={handleRefresh} sx={{ textTransform: 'none', color: green[600], '&:hover': { backgroundColor: green[100] } }}>
              <RefreshIcon sx={{ mr: 0.5 }} /> Refresh
            </Button>
          </Box>
          <Typography variant="body2" sx={{ color: '#444' }}>
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
            sx={{ color: green[600], textTransform: 'none', fontSize: '0.8rem', '&:hover': { backgroundColor: green[100] } }}
            onClick={() => console.log('Add short items')}
          >
            + ADD SHORT ITEMS TO CART IN BULK
          </Button>
        </Box>
      </Box>

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
        <Typography variant="body2" sx={{ color: 'black', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
          CREATED BETWEEN
        </Typography>
        <StyledDateInputContainer>
          <StyledDateTextField
            type="date"
            variant="standard"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Typography sx={{ color: 'black' }}>-</Typography>
          <StyledDateTextField
            type="date"
            variant="standard"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <CalendarTodayIcon sx={{ color: '#757575' }} />
        </StyledDateInputContainer>
      </Box>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: '#616161' }}>Loading orders...</Typography>
          </Box>
        ) : filteredOrders.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
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
                  <tr key={index} style={{ borderBottom: '1px solid #E0E0E0' }}>
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

      <NewCustomerOrderModal open={isModalOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default CustomerOrders;

const tableHeaderStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'darkgreen',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  backgroundColor: '#FFFFFF',
};

const tableCellStyle = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: 'black',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};