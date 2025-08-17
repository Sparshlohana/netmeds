// tables/Expenses.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Switch, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Mock data for expenses
const mockExpenses = [
  { id: 'EXP001', date: '2025-08-10', category: 'Rent', nature: 'Monthly', paidTo: 'Landlord Corp', payMode: 'Bank Transfer', utr: 'UTR123', amount: 5000, addedOn: '2025-08-10', addedBy: 'Admin', hasGst: true },
  { id: 'EXP002', date: '2025-08-09', category: 'Salaries', nature: 'Payroll', paidTo: 'Employee A', payMode: 'Bank Transfer', utr: 'UTR124', amount: 15000, addedOn: '2025-08-09', addedBy: 'Admin', hasGst: false },
  { id: 'EXP003', date: '2025-08-08', category: 'Utilities', nature: 'Electricity', paidTo: 'Power Co.', payMode: 'Online', utr: 'UTR125', amount: 1200, addedOn: '2025-08-08', addedBy: 'User1', hasGst: true },
  { id: 'EXP004', date: '2025-08-07', category: 'Office Supplies', nature: 'Stationery', paidTo: 'OfficeMart', payMode: 'Cash', utr: '', amount: 350, addedOn: '2025-08-07', addedBy: 'Admin', hasGst: true },
  { id: 'EXP005', date: '2025-08-06', category: 'Travel', nature: 'Conveyance', paidTo: 'Employee B', payMode: 'UPI', utr: 'UTR126', amount: 800, addedOn: '2025-08-06', addedBy: 'User2', hasGst: false },
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

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2025-08-05');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [gstOnly, setGstOnly] = useState(false);
  const [sortBy, setSortBy] = useState(null); // Column key to sort by
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setExpenses(mockExpenses);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAndSortedExpenses = useMemo(() => {
    let result = [...expenses];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(expense =>
        expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.paidTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      });
    }

    // Apply GST filter
    if (gstOnly) {
      result = result.filter(expense => expense.hasGst);
    }

    // Apply sorting
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
  }, [expenses, searchTerm, startDate, endDate, gstOnly, sortBy, sortOrder]);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('asc'); // Default to ascending when changing sort column
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
        src="/images/emptyCart.png" // Using the same empty cart image for consistency
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
          Business Expenses
        </Typography>
        <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => console.log('Add New Expense')}>
          Add New Expense (F2)
        </ActionButton>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        Be it Rent or Salaries, track all your shop expenses with ease
      </Typography>

      {/* Search, Date Filter, and GST Toggle */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
        <StyledTextField
          placeholder="Search by No or Party Name"
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
          ADDED BETWEEN
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
        <FormControlLabel
          control={
            <Switch
              checked={gstOnly}
              onChange={(e) => setGstOnly(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#f06292', // Pink color when checked
                  '&:hover': {
                    backgroundColor: 'rgba(240, 98, 146, 0.08)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#f06292', // Pink track when checked
                },
              }}
            />
          }
          label={<Typography sx={{ color: 'white' }}>Expense with GST Only</Typography>}
          labelPlacement="start"
          sx={{ ml: 2 }}
        />
      </Box>

      {/* Expenses Table */}
      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'gray' }}>Loading expenses...</Typography>
          </Box>
        ) : filteredAndSortedExpenses.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)} onClick={() => handleSort('id')}>EXPENSE NO</th>
                  <th style={tableHeaderStyle('date', sortBy, sortOrder)} onClick={() => handleSort('date')}>EXPENSE DATE</th>
                  <th style={tableHeaderStyle('category', sortBy, sortOrder)} onClick={() => handleSort('category')}>CATEGORY</th>
                  <th style={tableHeaderStyle('nature', sortBy, sortOrder)} onClick={() => handleSort('nature')}>NATURE</th>
                  <th style={tableHeaderStyle('paidTo', sortBy, sortOrder)} onClick={() => handleSort('paidTo')}>PAID TO PARTY</th>
                  <th style={tableHeaderStyle('payMode', sortBy, sortOrder)} onClick={() => handleSort('payMode')}>PAY MODE / UTR</th>
                  <th style={tableHeaderStyle('amount', sortBy, sortOrder)} onClick={() => handleSort('amount')}>AMOUNT</th>
                  <th style={tableHeaderStyle('addedOn', sortBy, sortOrder)} onClick={() => handleSort('addedOn')}>ADDED ON</th>
                  <th style={tableHeaderStyle('addedBy', sortBy, sortOrder)} onClick={() => handleSort('addedBy')}>ADDED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedExpenses.map((expense) => (
                  <tr key={expense.id} style={{ borderBottom: '1px solid #2e2e4f' }}>
                    <td style={tableCellStyle}>{expense.id}</td>
                    <td style={tableCellStyle}>{expense.date}</td>
                    <td style={tableCellStyle}>{expense.category}</td>
                    <td style={tableCellStyle}>{expense.nature}</td>
                    <td style={tableCellStyle}>{expense.paidTo}</td>
                    <td style={tableCellStyle}>{`${expense.payMode} ${expense.utr ? '/ ' + expense.utr : ''}`}</td>
                    <td style={tableCellStyle}>${expense.amount.toFixed(2)}</td>
                    <td style={tableCellStyle}>{expense.addedOn}</td>
                    <td style={tableCellStyle}>{expense.addedBy}</td>
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
          Add New Expense - F2 | Move Up or Down - Arrow Keys | View Expense Detail - Enter
        </Typography>
      </Box>
    </Box>
  );
};

export default Expenses;

// Inline styles for table headers and cells
const tableHeaderStyle = (columnKey, currentSortBy, currentSortOrder) => ({
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'gray', // Consistent gray color for headers
  textTransform: 'uppercase',
  cursor: 'pointer',
  backgroundColor: '#1b1b36',
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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
