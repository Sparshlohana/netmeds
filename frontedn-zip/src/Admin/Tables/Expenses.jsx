// tables/Expenses.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Switch, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { green } from '@mui/material/colors';

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
  backgroundColor: green[600],
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: green[700],
    transform: 'translateY(-2px)',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
}));

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

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2025-08-05');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [gstOnly, setGstOnly] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setExpenses(mockExpenses);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAndSortedExpenses = useMemo(() => {
    let result = [...expenses];
    if (searchTerm) {
      result = result.filter(expense =>
        expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.paidTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      });
    }
    if (gstOnly) {
      result = result.filter(expense => expense.hasGst);
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
  }, [expenses, searchTerm, startDate, endDate, gstOnly, sortBy, sortOrder]);

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
      <Typography variant="body1" sx={{ color: '#616161', mt: 2 }}>
        No data
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>
          Business Expenses
        </Typography>
        <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => console.log('Add New Expense')}>
          Add New Expense (F2)
        </ActionButton>
      </Box>
      <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>
        Be it Rent or Salaries, track all your shop expenses with ease
      </Typography>

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
        <Typography variant="body2" sx={{ color: 'black', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
          ADDED BETWEEN
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
        <FormControlLabel
          control={
            <Switch
              checked={gstOnly}
              onChange={(e) => setGstOnly(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: green[600],
                  '&:hover': {
                    backgroundColor: green[100],
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: green[600],
                },
              }}
            />
          }
          label={<Typography sx={{ color: 'black' }}>Expense with GST Only</Typography>}
          labelPlacement="start"
          sx={{ ml: 2 }}
        />
      </Box>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: '#616161' }}>Loading expenses...</Typography>
          </Box>
        ) : filteredAndSortedExpenses.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)}>EXPENSE NO</th>
                  <th style={tableHeaderStyle('date', sortBy, sortOrder)}>EXPENSE DATE</th>
                  <th style={tableHeaderStyle('category', sortBy, sortOrder)}>CATEGORY</th>
                  <th style={tableHeaderStyle('nature', sortBy, sortOrder)}>NATURE</th>
                  <th style={tableHeaderStyle('paidTo', sortBy, sortOrder)}>PAID TO PARTY</th>
                  <th style={tableHeaderStyle('payMode', sortBy, sortOrder)}>PAY MODE / UTR</th>
                  <th style={tableHeaderStyle('amount', sortBy, sortOrder)}>AMOUNT</th>
                  <th style={tableHeaderStyle('addedOn', sortBy, sortOrder)}>ADDED ON</th>
                  <th style={tableHeaderStyle('addedBy', sortBy, sortOrder)}>ADDED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedExpenses.map((expense) => (
                  <tr key={expense.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
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

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', color: '#616161' }}>
          Add New Expense - F2 | Move Up or Down - Arrow Keys | View Expense Detail - Enter
        </Typography>
      </Box>
    </Box>
  );
};

export default Expenses;

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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};