// Admin/Views/InvoicesSalesPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, Select, MenuItem, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Mock data for sales transactions
const mockTransactions = [
  { id: 'INV001', customer: 'John Doe', billedOn: '2025-08-10', billedAmt: 1500, netProfit: 300, adjAmt: 0, payable: 1500, balance: 0, paidDue: 'Paid', username: 'admin' },
  { id: 'INV002', customer: 'Jane Smith', billedOn: '2025-08-09', billedAmt: 2500, netProfit: 500, adjAmt: 0, payable: 2500, balance: 0, paidDue: 'Paid', username: 'admin' },
  { id: 'INV003', customer: 'Alice Johnson', billedOn: '2025-08-08', billedAmt: 800, netProfit: 160, adjAmt: 0, payable: 800, balance: 0, paidDue: 'Due', username: 'admin' },
  { id: 'INV004', customer: 'Bob Williams', billedOn: '2025-08-07', billedAmt: 3200, netProfit: 640, adjAmt: 0, payable: 3200, balance: 0, paidDue: 'Paid', username: 'user1' },
  { id: 'INV005', customer: 'Charlie Brown', billedOn: '2025-08-06', billedAmt: 1200, netProfit: 240, adjAmt: 0, payable: 1200, balance: 0, paidDue: 'Due', username: 'admin' },
  { id: 'INV006', customer: 'David Wilson', billedOn: '2025-08-05', billedAmt: 950, netProfit: 190, adjAmt: 0, payable: 950, balance: 0, paidDue: 'Paid', username: 'user2' },
  { id: 'INV007', customer: 'Eve Davis', billedOn: '2025-08-04', billedAmt: 1800, netProfit: 360, adjAmt: 0, payable: 1800, balance: 0, paidDue: 'Paid', username: 'admin' },
  { id: 'INV008', customer: 'Frank White', billedOn: '2025-08-03', billedAmt: 700, netProfit: 140, adjAmt: 0, payable: 700, balance: 0, paidDue: 'Due', username: 'user1' },
  { id: 'INV009', customer: 'Grace Black', billedOn: '2025-08-02', billedAmt: 2000, netProfit: 400, adjAmt: 0, payable: 2000, balance: 0, paidDue: 'Paid', username: 'admin' },
  { id: 'INV010', customer: 'Henry Green', billedOn: '2025-08-01', billedAmt: 1100, netProfit: 220, adjAmt: 0, payable: 1100, balance: 0, paidDue: 'Due', username: 'user2' },
];

// Styled component for the search/filter inputs
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
  '& .MuiInputLabel-root': { 
    color: 'gray',
  },
  '& .MuiSelect-select': { 
    padding: '10px 14px',
    backgroundColor: '#1b1b36',
    borderRadius: '8px',
    color: 'white',
  },
  '& .MuiSvgIcon-root': { 
    color: 'gray',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#333',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f06292',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#1b1b36',
  borderRadius: '8px',
  border: '1px solid #333',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f06292',
  },
  '& .MuiSelect-select': {
    padding: '10px 14px',
    color: 'white',
  },
  '& .MuiSvgIcon-root': {
    color: 'gray',
  },
}));

// Action Button Styling
const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '10px 20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
  },
}));

const CreateSalesInvoiceButton = styled(ActionButton)({
  backgroundColor: '#5e35b1',
  '&:hover': {
    backgroundColor: '#4527a0',
  },
});

const ViewCustomersButton = styled(ActionButton)({
  backgroundColor: '#424242',
  '&:hover': {
    backgroundColor: '#212121',
  },
});


const Purchases = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceNoSearch, setInvoiceNoSearch] = useState('');
  const [customerInfoSearch, setCustomerInfoSearch] = useState('');
  const [dateRange, setDateRange] = useState('FEB 12, 2025 - AUG 12, 2025');
  const [filterByPaidDue, setFilterByPaidDue] = useState('');
  const [sortBy, setSortBy] = useState('billedOn');
  const [sortOrder, setSortOrder] = useState('desc');

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 500);
  }, []);

  // Filter and sort transactions using useMemo for performance optimization
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply Invoice No search
    if (invoiceNoSearch) {
      result = result.filter(t => t.id.toLowerCase().includes(invoiceNoSearch.toLowerCase()));
    }

    // Apply Customer Name / Info search
    if (customerInfoSearch) {
      result = result.filter(t => t.customer.toLowerCase().includes(customerInfoSearch.toLowerCase()));
    }

    // Apply Paid / Due filter
    if (filterByPaidDue) {
      result = result.filter(t => t.paidDue.toLowerCase() === filterByPaidDue.toLowerCase());
    }

    // Apply sorting
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      // Handle string comparison for names/IDs
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      // Handle numeric comparison for amounts
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      // Handle date comparison (assuming 'YYYY-MM-DD' format)
      if (sortBy === 'billedOn') {
        const dateA = new Date(valA);
        const dateB = new Date(valB);
        return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    return result;
  }, [transactions, invoiceNoSearch, customerInfoSearch, filterByPaidDue, sortBy, sortOrder]);

  const toggleSortOrder = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const calculateSummary = (key) => {
    return filteredAndSortedTransactions.reduce((sum, t) => sum + t[key], 0);
  };

  // Helper component for summary cards
  const SummaryCard = ({ title, value }) => (
    <Card sx={{ 
      backgroundColor: '#1b1b36', 
      p: 2, 
      borderRadius: '8px', 
      boxShadow: 'none',
      border: '1px solid #2e2e4f',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start' 
    }}>
      <Typography variant="body2" sx={{ color: 'gray', mb: 0.5 }}>{title}</Typography>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>{value}</Typography>
    </Card>
  );

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
        We've Plenty Of Space For Your Data, We Promise!
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Typography variant="h5" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>Sales Transactions</Typography>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>View list of all your Sales transactions here</Typography>

      {/* Sales Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 4 }}>
        <SummaryCard title="Sales Count" value={filteredAndSortedTransactions.length} />
        <SummaryCard title="Sales Amt Sum" value={`$${calculateSummary('billedAmt').toFixed(2)}`} />
        <SummaryCard title="Sales Net Profit" value={`$${calculateSummary('netProfit').toFixed(2)}`} />
        <SummaryCard title="Payable Sum" value={`$${calculateSummary('payable').toFixed(2)}`} />
        <SummaryCard title="Balance Sum" value={`$${calculateSummary('balance').toFixed(2)}`} />
      </Box>

      {/* Search | Filter | Sort Section */}
      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f', mb: 4 }}>
        <Typography variant="body1" sx={{ color: 'gray', mb: 2, fontWeight: 'bold' }}>Search | Filter | Sort</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <StyledTextField
            label="Invoice No"
            variant="outlined"
            value={invoiceNoSearch}
            onChange={(e) => setInvoiceNoSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Customer Name / Info"
            variant="outlined"
            value={customerInfoSearch}
            onChange={(e) => setCustomerInfoSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledSelect
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="FEB 12, 2025 - AUG 12, 2025">FEB 12, 2025 - AUG 12, 2025</MenuItem>
          </StyledSelect>
          <StyledSelect
            value={filterByPaidDue}
            onChange={(e) => setFilterByPaidDue(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            startAdornment={
                <InputAdornment position="start">
                    <FilterListIcon sx={{ color: 'gray' }} />
                </InputAdornment>
            }
          >
            <MenuItem value="">FILTER BY</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Due">Due</MenuItem>
          </StyledSelect>
          <StyledSelect
            value={sortBy}
            onChange={(e) => toggleSortOrder(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            startAdornment={
                <InputAdornment position="start">
                    <SortIcon sx={{ color: 'gray' }} />
                </InputAdornment>
            }
          >
            <MenuItem value="billedOn">SORT BY Date</MenuItem>
            <MenuItem value="billedAmt">SORT BY Amount</MenuItem>
            <MenuItem value="customer">SORT BY Customer Name</MenuItem>
            <MenuItem value="paidDue">SORT BY Paid/Due</MenuItem>
          </StyledSelect>
        </Box>
      </Card>

      {/* Sales Transactions Table */}
      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'gray' }}>Loading sales transactions...</Typography>
          </Box>
        ) : filteredAndSortedTransactions.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)} onClick={() => toggleSortOrder('id')}>INVOICE NO</th>
                  <th style={tableHeaderStyle('customer', sortBy, sortOrder)} onClick={() => toggleSortOrder('customer')}>CUSTOMER NAME / INFO</th>
                  <th style={tableHeaderStyle('billedOn', sortBy, sortOrder)} onClick={() => toggleSortOrder('billedOn')}>BILLED ON</th>
                  <th style={tableHeaderStyle('billedAmt', sortBy, sortOrder)} onClick={() => toggleSortOrder('billedAmt')}>INV AMT</th>
                  <th style={tableHeaderStyle('netProfit', sortBy, sortOrder)} onClick={() => toggleSortOrder('netProfit')}>NET PROFIT</th>
                  <th style={tableHeaderStyle('adjAmt', sortBy, sortOrder)} onClick={() => toggleSortOrder('adjAmt')}>ADJ AMT</th>
                  <th style={tableHeaderStyle('payable', sortBy, sortOrder)} onClick={() => toggleSortOrder('payable')}>PAYABLE</th>
                  <th style={tableHeaderStyle('balance', sortBy, sortOrder)} onClick={() => toggleSortOrder('balance')}>BALANCE</th>
                  <th style={tableHeaderStyle('paidDue', sortBy, sortOrder)} onClick={() => toggleSortOrder('paidDue')}>PAID / DUE</th>
                  <th style={tableHeaderStyle('username', sortBy, sortOrder)} onClick={() => toggleSortOrder('username')}>USERNAME</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} style={{ borderBottom: '1px solid #2e2e4f' }}>
                    <td style={tableCellStyle}>{transaction.id}</td>
                    <td style={tableCellStyle}>{transaction.customer}</td>
                    <td style={tableCellStyle}>{transaction.billedOn}</td>
                    <td style={tableCellStyle}>${transaction.billedAmt.toFixed(2)}</td>
                    <td style={tableCellStyle}>${transaction.netProfit.toFixed(2)}</td>
                    <td style={tableCellStyle}>${transaction.adjAmt.toFixed(2)}</td>
                    <td style={tableCellStyle}>${transaction.payable.toFixed(2)}</td>
                    <td style={tableCellStyle}>${transaction.balance.toFixed(2)}</td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        backgroundColor: transaction.paidDue === 'Paid' ? '#4CAF5033' : '#F4433633', // Green/Red with opacity
                        color: transaction.paidDue === 'Paid' ? '#4CAF50' : '#F44336', // Solid Green/Red
                      }}>
                        {transaction.paidDue}
                      </span>
                    </td>
                    <td style={tableCellStyle}>{transaction.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <EmptyStateIllustration />
        )}
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
        <CreateSalesInvoiceButton
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => console.log('Create Sales Invoice')}
        >
          Create Sales Invoice
        </CreateSalesInvoiceButton>
        <ViewCustomersButton
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => console.log('View Customers')}
        >
          View Customers
        </ViewCustomersButton>
      </Box>

      {/* Keyboard Shortcuts Hint */}
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'gray', mt: 3 }}>
        Create New Sales - F2 | Move up or Down - Arrow Keys | To Open - Enter
      </Typography>
    </Box>
  );
};

export default Purchases;

// Inline styles for table for better control within JSX
const tableHeaderStyle = (columnKey, currentSortBy, currentSortOrder) => ({
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'rgba(255, 255, 255, 0.8)', // Lighter color for headers
  textTransform: 'uppercase',
  cursor: 'pointer',
  backgroundColor: '#1b1b36', // Match card background for header row
  position: 'sticky',
  top: 0,
  zIndex: 1,
  // Highlight currently sorted column
  ...(columnKey === currentSortBy && {
    color: '#f06292', // Highlight color
  }),
});

const tableCellStyle = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: 'white',
  whiteSpace: 'nowrap',
};
