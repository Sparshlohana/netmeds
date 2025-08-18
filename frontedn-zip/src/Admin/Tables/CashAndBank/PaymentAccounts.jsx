// tables/CashAndBank/PaymentAccounts.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Mock data for payment accounts
const mockAccounts = [
  { id: 'ACC001', name: 'Cash on Hand', branch: '', type: 'CASH', accHolder: '', ifsc: '', balance: 50000.00, latestTxn: '04-Aug-25 at 01:30 PM' },
  { id: 'ACC002', name: 'Bank of India', branch: 'Main Branch', type: 'BANK', accHolder: 'John Doe / UPI123', ifsc: 'BOI0001234', balance: 120000.50, latestTxn: '03-Aug-25 at 10:00 AM' },
  { id: 'ACC003', name: 'Paytm Wallet', branch: '', type: 'WALLET', accHolder: 'Jane Smith / UPI456', ifsc: '', balance: 1500.75, latestTxn: '02-Aug-25 at 05:45 PM' },
  { id: 'ACC004', name: 'Credit Card', branch: 'Visa', type: 'CARD', accHolder: 'Alice Johnson', ifsc: '', balance: -2000.00, latestTxn: '01-Aug-25 at 11:20 AM' },
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

const PaymentAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAccounts(mockAccounts);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAndSortedAccounts = useMemo(() => {
    let result = [...accounts];

    if (searchTerm) {
      result = result.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accHolder.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      result = result.filter(account => account.type === filterType);
    }

    if (sortBy) {
      result.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [accounts, searchTerm, filterType, sortBy, sortOrder]);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('asc');
    }
  };

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
        alt="No data"
        style={{ width: '100%', maxWidth: '300px', opacity: 0.8 }}
      />
      <Typography variant="body1" sx={{ color: 'gray', mt: 2 }}>
        No data
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Payment Accounts
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ color: '#f06292', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
            <InfoOutlinedIcon sx={{ mr: 0.5 }} /> Watch Tutorial
          </Button>
          <ActionButton onClick={() => console.log('Add New Txn')}>
            Add New Txn (F2)
          </ActionButton>
          <ActionButton onClick={() => console.log('Add New Acc')} sx={{ backgroundColor: '#f06292', '&:hover': { backgroundColor: '#c8507a' } }}>
            Add New Acc (F4)
          </ActionButton>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        Manage & track all of your Cash Flow & Accounts
      </Typography>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f', mb: 4 }}>
        <Typography variant="body1" sx={{ color: 'gray', mb: 2, fontWeight: 'bold' }}>Search Accounts</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <StyledTextField
            placeholder="Search by Account Name, IFSC, UTR, etc."
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
          <StyledSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by Type' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">FILTER BY</MenuItem>
            <MenuItem value="CASH">Type: Cash</MenuItem>
            <MenuItem value="BANK">Type: Bank</MenuItem>
            <MenuItem value="WALLET">Type: Wallet</MenuItem>
            <MenuItem value="CARD">Type: Card</MenuItem>
          </StyledSelect>
          <StyledSelect
            value={sortBy || ''}
            onChange={(e) => handleSort(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort by' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">SORT BY</MenuItem>
            <MenuItem value="name">Account Name</MenuItem>
            <MenuItem value="balance">Balance</MenuItem>
            <MenuItem value="latestTxn">Latest Transaction</MenuItem>
          </StyledSelect>
        </Box>
      </Card>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'gray' }}>Loading accounts...</Typography>
          </Box>
        ) : filteredAndSortedAccounts.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={tableHeaderStyle('name', sortBy, sortOrder)} onClick={() => handleSort('name')}>ACCOUNT NAME / BRANCH</th>
                  <th style={tableHeaderStyle('type', sortBy, sortOrder)} onClick={() => handleSort('type')}>TYPE</th>
                  <th style={tableHeaderStyle('accHolder', sortBy, sortOrder)} onClick={() => handleSort('accHolder')}>ACC HOLDER NAME / UPI</th>
                  <th style={tableHeaderStyle('ifsc', sortBy, sortOrder)} onClick={() => handleSort('ifsc')}>IFSC CODE</th>
                  <th style={tableHeaderStyle('balance', sortBy, sortOrder)} onClick={() => handleSort('balance')}>BALANCE</th>
                  <th style={tableHeaderStyle('latestTxn', sortBy, sortOrder)} onClick={() => handleSort('latestTxn')}>LATEST TXN</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAccounts.map((account) => (
                  <tr key={account.id} style={{ borderBottom: '1px solid #2e2e4f' }}>
                    <td style={tableCellStyle}>{account.name} {account.branch && `/ ${account.branch}`}</td>
                    <td style={tableCellStyle}>{account.type}</td>
                    <td style={tableCellStyle}>{account.accHolder}</td>
                    <td style={tableCellStyle}>{account.ifsc}</td>
                    <td style={tableCellStyle}>${account.balance.toFixed(2)}</td>
                    <td style={tableCellStyle}>{account.latestTxn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <EmptyStateIllustration />
        )}
      </Card>

      {/* Keyboard Shortcuts Hint */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', color: 'gray' }}>
          Add Txn - F2 | Add Acc - F4 | Select a Card - Up or Down Key | Open a Card - Enter | Scroll to Top - Alt + Up Key
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentAccounts;

const tableHeaderStyle = (columnKey, currentSortBy, currentSortOrder) => ({
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'gray',
  textTransform: 'uppercase',
  cursor: 'pointer',
  backgroundColor: '#1b1b36',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  ...(columnKey === currentSortBy && {
    color: '#f06292',
  }),
});

const tableCellStyle = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: 'white',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
