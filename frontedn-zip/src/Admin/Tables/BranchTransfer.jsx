// tables/BranchTransfer.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Tabs, Tab, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Mock data for branch transfer requests
const mockTransfers = [
  { id: 'TRF001', requestedOn: '2025-06-10', status: 'Pending', lastChange: '2025-06-12', transferredTo: 'Branch A / GSTIN1', skuCount: 15, amountGst: 1500, totalAmt: 1770, addedBy: 'Admin', type: 'RECEIVED' },
  { id: 'TRF002', requestedOn: '2025-06-08', status: 'Completed', lastChange: '2025-06-15', transferredTo: 'Branch B / GSTIN2', skuCount: 20, amountGst: 2000, totalAmt: 2360, addedBy: 'User1', type: 'SENT' },
  { id: 'TRF003', requestedOn: '2025-06-05', status: 'Rejected', lastChange: '2025-06-06', transferredTo: 'Branch C / GSTIN3', skuCount: 5, amountGst: 500, totalAmt: 590, addedBy: 'Admin', type: 'RECEIVED' },
  { id: 'TRF004', requestedOn: '2025-06-01', status: 'Pending', lastChange: '2025-06-01', transferredTo: 'Branch A / GSTIN1', skuCount: 10, amountGst: 1000, totalAmt: 1180, addedBy: 'User2', type: 'SENT' },
  { id: 'TRF005', requestedOn: '2025-05-28', status: 'Completed', lastChange: '2025-06-03', transferredTo: 'Branch D / GSTIN4', skuCount: 8, amountGst: 800, totalAmt: 944, addedBy: 'Admin', type: 'RECEIVED' },
  { id: 'TRF006', requestedOn: '2025-05-25', status: 'Pending', lastChange: '2025-05-25', transferredTo: 'Branch B / GSTIN2', skuCount: 12, amountGst: 1200, totalAmt: 1416, addedBy: 'User1', type: 'PURCHASE RETURN' },
  { id: 'TRF007', requestedOn: '2025-05-20', status: 'Completed', lastChange: '2025-05-22', transferredTo: 'Branch C / GSTIN3', skuCount: 7, amountGst: 700, totalAmt: 826, addedBy: 'Admin', type: 'RETURN RECEIVED' },
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

const BranchTransfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0: RECEIVED, 1: SENT, 2: PURCHASE RETURN, 3: RETURN RECEIVED
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [startDate, setStartDate] = useState('2025-06-13');
  const [endDate, setEndDate] = useState('2025-08-13');
  const [sortBy, setSortBy] = useState(null); // Column key to sort by
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransfers(mockTransfers);
      setLoading(false);
    }, 500);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setFilterBranch('');
    setSortBy(null);
    setSortOrder('asc');
  };

  const filteredAndSortedTransfers = useMemo(() => {
    let result = [...transfers];
    const typeFilter = ['RECEIVED', 'SENT', 'PURCHASE RETURN', 'RETURN RECEIVED'][activeTab];

    result = result.filter(transfer => transfer.type === typeFilter);

    // Apply search filter
    if (searchTerm) {
      result = result.filter(transfer =>
        transfer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply branch filter
    if (filterBranch) {
      result = result.filter(transfer =>
        transfer.transferredTo.toLowerCase().includes(filterBranch.toLowerCase())
      );
    }

    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(transfer => {
        const transferDate = new Date(transfer.requestedOn);
        return transferDate >= start && transferDate <= end;
      });
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
  }, [transfers, activeTab, searchTerm, filterBranch, startDate, endDate, sortBy, sortOrder]);

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
        src="/images/emptyCart.png" // Using the same empty cart image for consistency
        alt="No data"
        style={{ width: '100%', maxWidth: '300px', opacity: 0.8 }}
      />
      <Typography variant="body1" sx={{ color: 'gray', mt: 2 }}>
        We've Plenty Of Space For Your Data, We Promise!
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Branch Transfer Requests
        </Typography>
        <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => console.log('Add Branch Transfer')}>
          Add Branch Transfer (F2)
        </ActionButton>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        List of all the Branch Transfer Requests received or sent
      </Typography>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          sx={{
            borderBottom: '1px solid #2e2e4f',
            mb: 2,
            '& .MuiTab-root': { color: 'gray', fontWeight: 'bold' },
            '& .Mui-selected': { color: '#f06292 !important' },
            '& .MuiTabs-indicator': { backgroundColor: '#f06292' },
          }}
        >
          <Tab label="RECEIVED" />
          <Tab label="SENT" />
          <Tab label="PURCHASE RETURN" />
          <Tab label="RETURN RECEIVED" />
        </Tabs>

        {/* Search, Filter, and Date Range */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#f06292', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            Search | Filter | Sort
          </Typography>
          <StyledTextField
            placeholder="Search by Transfer No"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '200px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledSelect
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by Branch' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">Filter By Branch</MenuItem>
            <MenuItem value="Branch A">Branch A</MenuItem>
            <MenuItem value="Branch B">Branch B</MenuItem>
            <MenuItem value="Branch C">Branch C</MenuItem>
            <MenuItem value="Branch D">Branch D</MenuItem>
          </StyledSelect>
          <Typography variant="body2" sx={{ color: 'white', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
            SELECT DATE RANGE
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

        {/* Transfers Table */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'gray' }}>Loading transfers...</Typography>
          </Box>
        ) : filteredAndSortedTransfers.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)} onClick={() => handleSort('id')}>TRANSFER NO</th>
                  <th style={tableHeaderStyle('requestedOn', sortBy, sortOrder)} onClick={() => handleSort('requestedOn')}>REQUESTED ON</th>
                  <th style={tableHeaderStyle('status', sortBy, sortOrder)} onClick={() => handleSort('status')}>STATUS</th>
                  <th style={tableHeaderStyle('lastChange', sortBy, sortOrder)} onClick={() => handleSort('lastChange')}>LAST CHANGE</th>
                  <th style={tableHeaderStyle('transferredTo', sortBy, sortOrder)} onClick={() => handleSort('transferredTo')}>TRANSFERRED TO / GSTIN</th>
                  <th style={tableHeaderStyle('skuCount', sortBy, sortOrder)} onClick={() => handleSort('skuCount')}>SKU COUNT</th>
                  <th style={tableHeaderStyle('amountGst', sortBy, sortOrder)} onClick={() => handleSort('amountGst')}>AMOUNT / GST</th>
                  <th style={tableHeaderStyle('totalAmt', sortBy, sortOrder)} onClick={() => handleSort('totalAmt')}>TOTAL AMT</th>
                  <th style={tableHeaderStyle('addedBy', sortBy, sortOrder)} onClick={() => handleSort('addedBy')}>ADDED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransfers.map((transfer) => (
                  <tr key={transfer.id} style={{ borderBottom: '1px solid #2e2e4f' }}>
                    <td style={tableCellStyle}>{transfer.id}</td>
                    <td style={tableCellStyle}>{transfer.requestedOn}</td>
                    <td style={tableCellStyle}>{transfer.status}</td>
                    <td style={tableCellStyle}>{transfer.lastChange}</td>
                    <td style={tableCellStyle}>{transfer.transferredTo}</td>
                    <td style={tableCellStyle}>{transfer.skuCount}</td>
                    <td style={tableCellStyle}>${transfer.amountGst.toFixed(2)}</td>
                    <td style={tableCellStyle}>${transfer.totalAmt.toFixed(2)}</td>
                    <td style={tableCellStyle}>{transfer.addedBy}</td>
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
          Branch Transfer - F2 | Move Up or Down - Arrow Keys | To Open - Enter
        </Typography>
      </Box>
    </Box>
  );
};

export default BranchTransfer;

// Inline styles for table headers and cells
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