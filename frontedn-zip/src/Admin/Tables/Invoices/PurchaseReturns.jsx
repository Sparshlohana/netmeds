// Admin/Views/InvoicesSalesPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, Select, MenuItem, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { green } from '@mui/material/colors';

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
    padding: '12px 14px',
    color: 'black',
  },
  '& .MuiInputLabel-root': {
    color: '#757575',
  },
  '& .MuiInputAdornment-root': {
    color: '#757575',
    marginRight: theme.spacing(1),
  },
  '& .MuiSelect-select': {
    padding: '10px 14px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    color: 'black',
  },
  '& .MuiSvgIcon-root': {
    color: '#757575',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'black',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#BDBDBD',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: green[500],
  },
  '& .MuiSelect-select': {
    padding: '10px 14px',
    color: 'black',
  },
  '& .MuiSvgIcon-root': {
    color: '#757575',
  },
}));

const StyledDateInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  gap: '4px',
  position: 'relative',
  '&:hover': {
    borderColor: '#BDBDBD',
  },
  '&:focus-within': {
    borderColor: green[500],
  },
}));

const StyledDateTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    '& fieldset': {
      borderColor: 'transparent',
    },
    padding: '0 !important',
  },
  '& input[type="date"]': {
    padding: '12px 0px',
    color: 'black',
    width: '100%',
    boxSizing: 'border-box',
  },
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '10px 20px',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
}));

const CreateSalesInvoiceButton = styled(ActionButton)({
  backgroundColor: green[600],
  color: 'white',
  '&:hover': {
    backgroundColor: green[700],
  },
});

const ViewCustomersButton = styled(ActionButton)({
  backgroundColor: '#424242',
  color: 'white',
  '&:hover': {
    backgroundColor: '#212121',
  },
});


const PurchaseReturns = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceNoSearch, setInvoiceNoSearch] = useState('');
  const [customerInfoSearch, setCustomerInfoSearch] = useState('');
  const [startDate, setStartDate] = useState('2025-02-12');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [filterByPaidDue, setFilterByPaidDue] = useState('');
  const [sortBy, setSortBy] = useState('billedOn');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];
    if (invoiceNoSearch) {
      result = result.filter(t => t.id.toLowerCase().includes(invoiceNoSearch.toLowerCase()));
    }
    if (customerInfoSearch) {
      result = result.filter(t => t.customer.toLowerCase().includes(customerInfoSearch.toLowerCase()));
    }
    if (filterByPaidDue) {
      result = result.filter(t => t.paidDue.toLowerCase() === filterByPaidDue.toLowerCase());
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(t => {
        const billedDate = new Date(t.billedOn);
        return billedDate >= start && billedDate <= end;
      });
    }

    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      if (sortBy === 'billedOn') {
        const dateA = new Date(valA);
        const dateB = new Date(valB);
        return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    return result;
  }, [transactions, invoiceNoSearch, customerInfoSearch, filterByPaidDue, startDate, endDate, sortBy, sortOrder]);

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

  const SummaryCard = ({ title, value }) => (
    <Card sx={{
      backgroundColor: '#FFFFFF',
      p: 2,
      borderRadius: '8px',
      boxShadow: 'none',
      border: '1px solid #E0E0E0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <Typography variant="body2" sx={{ color: '#444', mb: 0.5 }}>{title}</Typography>
      <Typography variant="h6" sx={{ color: 'darkgreen', fontWeight: 'bold' }}>{value}</Typography>
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
      <Typography variant="body1" sx={{ color: '#616161', mt: 2 }}>
        We've Plenty Of Space For Your Data, We Promise!
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Typography variant="h5" component="h1" sx={{ mb: 1, fontWeight: 'bold', color: 'darkgreen' }}>Sales Transactions</Typography>
      <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>View list of all your Sales transactions here</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 4 }}>
        <SummaryCard title="Sales Count" value={filteredAndSortedTransactions.length} />
        <SummaryCard title="Sales Amt Sum" value={`$${calculateSummary('billedAmt').toFixed(2)}`} />
        <SummaryCard title="Sales Net Profit" value={`$${calculateSummary('netProfit').toFixed(2)}`} />
        <SummaryCard title="Payable Sum" value={`$${calculateSummary('payable').toFixed(2)}`} />
        <SummaryCard title="Balance Sum" value={`$${calculateSummary('balance').toFixed(2)}`} />
      </Box>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0', mb: 4 }}>
        <Typography variant="body1" sx={{ color: 'darkgreen', mb: 2, fontWeight: 'bold' }}>Search | Filter | Sort</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <StyledTextField
            label="Invoice No"
            variant="outlined"
            value={invoiceNoSearch}
            onChange={(e) => setInvoiceNoSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 2, mt: 1 }}>
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
                <InputAdornment position="start" sx={{ mr: 2, mt: 1 }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledDateInputContainer>
            <StyledDateTextField
              type="date"
              variant="standard"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
            <Typography sx={{ color: 'black', mx: 0.5 }}>-</Typography>
            <StyledDateTextField
              type="date"
              variant="standard"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
            <InputAdornment position="end">
              <CalendarTodayIcon sx={{ color: '#757575', mr: 1 }} />
            </InputAdornment>
          </StyledDateInputContainer>

          <StyledSelect
            value={filterByPaidDue}
            onChange={(e) => setFilterByPaidDue(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon sx={{ color: '#757575' }} />
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
                <SortIcon sx={{ color: '#757575' }} />
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

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: '#616161' }}>Loading sales transactions...</Typography>
          </Box>
        ) : filteredAndSortedTransactions.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)}>INVOICE NO</th>
                  <th style={tableHeaderStyle('customer', sortBy, sortOrder)}>CUSTOMER NAME / INFO</th>
                  <th style={tableHeaderStyle('billedOn', sortBy, sortOrder)}>BILLED ON</th>
                  <th style={tableHeaderStyle('billedAmt', sortBy, sortOrder)}>INV AMT</th>
                  <th style={tableHeaderStyle('netProfit', sortBy, sortOrder)}>NET PROFIT</th>
                  <th style={tableHeaderStyle('adjAmt', sortBy, sortOrder)}>ADJ AMT</th>
                  <th style={tableHeaderStyle('payable', sortBy, sortOrder)}>PAYABLE</th>
                  <th style={tableHeaderStyle('balance', sortBy, sortOrder)}>BALANCE</th>
                  <th style={tableHeaderStyle('paidDue', sortBy, sortOrder)}>PAID / DUE</th>
                  <th style={tableHeaderStyle('username', sortBy, sortOrder)}>USERNAME</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
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
                        backgroundColor: transaction.paidDue === 'Paid' ? green[100] : '#F443361A',
                        color: transaction.paidDue === 'Paid' ? green[700] : '#F44336',
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

      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#616161', mt: 3 }}>
        Create New Sales - F2 | Move up or Down - Arrow Keys | To Open - Enter
      </Typography>
    </Box>
  );
};

export default PurchaseReturns;

const tableHeaderStyle = (columnKey, currentSortBy, currentSortOrder) => ({
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'darkgreen',
  textTransform: 'uppercase',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  ...(columnKey === currentSortBy && {
    color: '#000000',
  }),
});

const tableCellStyle = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: 'black',
  whiteSpace: 'nowrap',
};