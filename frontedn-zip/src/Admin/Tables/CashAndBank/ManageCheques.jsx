// tables/CashAndBank/ManageCheques.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Tabs, Tab, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { green } from '@mui/material/colors';


// Mock data for cheques
const mockCheques = [
  { id: 'CHQ001', chequeNo: '123456', brand: 'HDFC', amountIssued: 5000, issuedFor: 'Supplier A', invoiceNo: 'INV001', addedBy: 'Admin', status: 'OPEN' },
  { id: 'CHQ002', chequeNo: '123457', brand: 'ICICI', amountIssued: 10000, issuedFor: 'Rent', invoiceNo: '', addedBy: 'Admin', status: 'CLEARED' },
  { id: 'CHQ003', chequeNo: '123458', brand: 'SBI', amountIssued: 2500, issuedFor: 'Employee Salary', invoiceNo: '', addedBy: 'User1', status: 'OPEN' },
  { id: 'CHQ004', chequeNo: '123459', brand: 'AXIS', amountIssued: 7500, issuedFor: 'Supplier B', invoiceNo: 'INV005', addedBy: 'User2', status: 'CLEARED' },
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

const ManageCheques = () => {
  const [cheques, setCheques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0: OPEN CHEQUES, 1: CLEARED CHEQUES
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2025-08-05');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCheques(mockCheques);
      setLoading(false);
    }, 500);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setFilterBy('');
    setSortBy(null);
    setSortOrder('asc');
  };

  const filteredAndSortedCheques = useMemo(() => {
    let result = [...cheques];
    const statusFilter = ['OPEN', 'CLEARED'][activeTab];

    result = result.filter(cheque => cheque.status === statusFilter);

    if (searchTerm) {
      result = result.filter(cheque =>
        cheque.chequeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.issuedFor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      result = result.filter(cheque => cheque.brand.toLowerCase().includes(filterBy.toLowerCase()));
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
  }, [cheques, activeTab, searchTerm, filterBy, sortBy, sortOrder]);

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
        We've Plenty Of Space For Your Data, We Promise!
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>
          Manage Cheques
        </Typography>
        <ActionButton onClick={() => console.log('Add Open Cheque')} sx={{ backgroundColor: green[600], '&:hover': { backgroundColor: green[700] } }}>
          Add Open Cheque (F2)
        </ActionButton>
      </Box>
      <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>
        Never lose track of your Cheque Payments
      </Typography>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '& .MuiTab-root': { color: '#616161', fontWeight: 'bold' },
              '& .Mui-selected': { color: green[600] + ' !important' },
              '& .MuiTabs-indicator': { backgroundColor: green[600] },
            }}
          >
            <Tab label="OPEN CHEQUES" />
            <Tab label="CLEARED CHEQUES" />
          </Tabs>
          {/* Placeholder for summary chips */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#616161' }}>Paid-In Cheq</Typography>
            <Typography variant="body2" sx={{ color: '#616161' }}>Amount Received</Typography>
            <Typography variant="body2" sx={{ color: '#616161' }}>Paid-Out Cheq</Typography>
            <Typography variant="body2" sx={{ color: '#616161' }}>Amount Paid</Typography>
          </Box>
        </Box>

        {/* Search, Date Filter, and General Filters */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <StyledTextField
            placeholder="Search by Cheque No or Cheque Brand"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '250px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#757575' }} />
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
          <StyledSelect
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">FILTER BY</MenuItem>
            <MenuItem value="HDFC">Brand: HDFC</MenuItem>
            <MenuItem value="ICICI">Brand: ICICI</MenuItem>
            <MenuItem value="SBI">Brand: SBI</MenuItem>
            <MenuItem value="AXIS">Brand: AXIS</MenuItem>
          </StyledSelect>
          <StyledSelect
            value={sortBy || ''}
            onChange={(e) => handleSort(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort by' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">SORT BY</MenuItem>
            <MenuItem value="chequeNo">Cheque No</MenuItem>
            <MenuItem value="amountIssued">Amount</MenuItem>
            <MenuItem value="brand">Brand</MenuItem>
          </StyledSelect>
        </Box>
      </Card>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: '#616161' }}>Loading cheques...</Typography>
          </Box>
        ) : filteredAndSortedCheques.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <th style={tableHeaderStyle('chequeNo', sortBy, sortOrder)} onClick={() => handleSort('chequeNo')}>CHEQUE NO/MICR</th>
                  <th style={tableHeaderStyle('brand', sortBy, sortOrder)} onClick={() => handleSort('brand')}>CHEQUE BRAND</th>
                  <th style={tableHeaderStyle('amountIssued', sortBy, sortOrder)} onClick={() => handleSort('amountIssued')}>AMT / ISSUED</th>
                  <th style={tableHeaderStyle('issuedFor', sortBy, sortOrder)} onClick={() => handleSort('issuedFor')}>ISSUED FOR</th>
                  <th style={tableHeaderStyle('invoiceNo', sortBy, sortOrder)} onClick={() => handleSort('invoiceNo')}>INVOICE NO</th>
                  <th style={tableHeaderStyle('addedBy', sortBy, sortOrder)} onClick={() => handleSort('addedBy')}>ADDED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCheques.map((cheque) => (
                  <tr key={cheque.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
                    <td style={tableCellStyle}>{cheque.chequeNo}</td>
                    <td style={tableCellStyle}>{cheque.brand}</td>
                    <td style={tableCellStyle}>${cheque.amountIssued.toFixed(2)}</td>
                    <td style={tableCellStyle}>{cheque.issuedFor}</td>
                    <td style={tableCellStyle}>{cheque.invoiceNo || '-'}</td>
                    <td style={tableCellStyle}>{cheque.addedBy}</td>
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
        <Typography variant="caption" sx={{ display: 'block', color: '#616161' }}>
          Add New Cheque - F2 | Up or Down Key | Open a Card | Enter | Scroll to Top - Alt + Up Key
        </Typography>
      </Box>
    </Box>
  );
};

export default ManageCheques;

const tableHeaderStyle = (columnKey, currentSortBy, currentSortOrder) => ({
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: '#616161',
  textTransform: 'uppercase',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  ...(columnKey === currentSortBy && {
    color: green[600],
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