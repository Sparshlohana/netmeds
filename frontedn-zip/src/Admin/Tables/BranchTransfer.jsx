// tables/BranchTransfer.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Tabs, Tab, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { green } from '@mui/material/colors';

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

const BranchTransfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [startDate, setStartDate] = useState('2025-06-13');
  const [endDate, setEndDate] = useState('2025-08-13');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

    if (searchTerm) {
      result = result.filter(transfer =>
        transfer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterBranch) {
      result = result.filter(transfer =>
        transfer.transferredTo.toLowerCase().includes(filterBranch.toLowerCase())
      );
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(transfer => {
        const transferDate = new Date(transfer.requestedOn);
        return transferDate >= start && transferDate <= end;
      });
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
          Branch Transfer Requests
        </Typography>
        <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => console.log('Add Branch Transfer')}>
          Add Branch Transfer (F2)
        </ActionButton>
      </Box>
      <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>
        List of all the Branch Transfer Requests received or sent
      </Typography>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            borderBottom: '1px solid #E0E0E0',
            mb: 2,
            '& .MuiTab-root': { color: '#616161', fontWeight: 'bold' },
            '& .Mui-selected': { color: green[600] + ' !important' },
            '& .MuiTabs-indicator': { backgroundColor: green[600] },
          }}
        >
          <Tab label="RECEIVED" />
          <Tab label="SENT" />
          <Tab label="PURCHASE RETURN" />
          <Tab label="RETURN RECEIVED" />
        </Tabs>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
          <Typography variant="body2" sx={{ color: 'darkgreen', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
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
          <Typography variant="body2" sx={{ color: 'black', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
            SELECT DATE RANGE
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

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: '#616161' }}>Loading transfers...</Typography>
          </Box>
        ) : filteredAndSortedTransfers.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)}>TRANSFER NO</th>
                  <th style={tableHeaderStyle('requestedOn', sortBy, sortOrder)}>REQUESTED ON</th>
                  <th style={tableHeaderStyle('status', sortBy, sortOrder)}>STATUS</th>
                  <th style={tableHeaderStyle('lastChange', sortBy, sortOrder)}>LAST CHANGE</th>
                  <th style={tableHeaderStyle('transferredTo', sortBy, sortOrder)}>TRANSFERRED TO / GSTIN</th>
                  <th style={tableHeaderStyle('skuCount', sortBy, sortOrder)}>SKU COUNT</th>
                  <th style={tableHeaderStyle('amountGst', sortBy, sortOrder)}>AMOUNT / GST</th>
                  <th style={tableHeaderStyle('totalAmt', sortBy, sortOrder)}>TOTAL AMT</th>
                  <th style={tableHeaderStyle('addedBy', sortBy, sortOrder)}>ADDED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransfers.map((transfer) => (
                  <tr key={transfer.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
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

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', color: '#616161' }}>
          Branch Transfer - F2 | Move Up or Down - Arrow Keys | To Open - Enter
        </Typography>
      </Box>
    </Box>
  );
};

export default BranchTransfer;

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