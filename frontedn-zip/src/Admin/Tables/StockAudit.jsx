// tables/StockAudit.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, styled, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Mock data for stock audit entries
const mockAudits = [
  { id: 'AUD001', status: 'Pending', type: 'Full', auditEndStart: '2025-08-05 - 2025-08-10', progress: '50%', adjusted: 'Yes', adjustedBy: 'Admin' },
  { id: 'AUD002', status: 'Completed', type: 'Cycle', auditEndStart: '2025-07-20 - 2025-07-22', progress: '100%', adjusted: 'No', adjustedBy: 'User1' },
  { id: 'AUD003', status: 'In Progress', type: 'Full', auditEndStart: '2025-08-11 - 2025-08-15', progress: '20%', adjusted: 'N/A', adjustedBy: 'Admin' },
  { id: 'AUD004', status: 'Completed', type: 'Full', auditEndStart: '2025-07-01 - 2025-07-05', progress: '100%', adjusted: 'Yes', adjustedBy: 'User2' },
  { id: 'AUD005', status: 'Pending', type: 'Cycle', auditEndStart: '2025-08-15 - 2025-08-20', progress: '0%', adjusted: 'N/A', adjustedBy: 'Admin' },
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

const StockAudit = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2025-08-05');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAudits(mockAudits);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAndSortedAudits = useMemo(() => {
    let result = [...audits];

    if (searchTerm) {
      result = result.filter(audit =>
        audit.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      result = result.filter(audit => audit.status.toLowerCase() === filterBy.toLowerCase());
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter(audit => {
        const [auditStartStr, auditEndStr] = audit.auditEndStart.split(' - ');
        const auditStartDate = new Date(auditStartStr);
        const auditEndDate = new Date(auditEndStr);
        return auditStartDate >= start && auditEndDate <= end;
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
  }, [audits, searchTerm, filterBy, startDate, endDate, sortBy, sortOrder]);

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
        We've Plenty Of Space For Your Data, We Promise!
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Physical Stock Audit
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: '#f06292', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
            <InfoOutlinedIcon sx={{ mr: 0.5 }} /> How Audit Works?
          </Button>
          <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => console.log('New Audit')}>
            New Audit (F2)
          </ActionButton>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        Verify Physical Stock against Software Stock
      </Typography>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        <Typography variant="body2" sx={{ color: '#f06292', fontWeight: 'bold', mb: 2 }}>
          Search | Filter | Sort
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
          <StyledTextField
            placeholder="Search by audit no"
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
          <StyledSelect
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">FILTER BY</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </StyledSelect>
          <StyledSelect
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort by' }}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">SORT BY</MenuItem>
            <MenuItem value="id">Audit Number</MenuItem>
            <MenuItem value="auditEndStart">Audit Date</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </StyledSelect>
        </Box>

        {/* Audit Table */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" sx={{ color: 'gray' }}>Loading audits...</Typography>
          </Box>
        ) : filteredAndSortedAudits.length > 0 ? (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={tableHeaderStyle('id', sortBy, sortOrder)} onClick={() => handleSort('id')}>AUDIT NUMBER</th>
                  <th style={tableHeaderStyle('status', sortBy, sortOrder)} onClick={() => handleSort('status')}>AUDIT STATUS</th>
                  <th style={tableHeaderStyle('type', sortBy, sortOrder)} onClick={() => handleSort('type')}>AUDIT TYPE</th>
                  <th style={tableHeaderStyle('auditEndStart', sortBy, sortOrder)} onClick={() => handleSort('auditEndStart')}>AUDIT END / START</th>
                  <th style={tableHeaderStyle('progress', sortBy, sortOrder)} onClick={() => handleSort('progress')}>PROGRESS IN SKUs</th>
                  <th style={tableHeaderStyle('adjusted', sortBy, sortOrder)} onClick={() => handleSort('adjusted')}>ADJUSTED</th>
                  <th style={tableHeaderStyle('adjustedBy', sortBy, sortOrder)} onClick={() => handleSort('adjustedBy')}>ADJUSTED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAudits.map((audit) => (
                  <tr key={audit.id} style={{ borderBottom: '1px solid #2e2e4f' }}>
                    <td style={tableCellStyle}>{audit.id}</td>
                    <td style={tableCellStyle}>{audit.status}</td>
                    <td style={tableCellStyle}>{audit.type}</td>
                    <td style={tableCellStyle}>{audit.auditEndStart}</td>
                    <td style={tableCellStyle}>{audit.progress}</td>
                    <td style={tableCellStyle}>{audit.adjusted}</td>
                    <td style={tableCellStyle}>{audit.adjustedBy}</td>
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
          New Audit - F2 | Select a Card - Up or Down Key | Open a Card - Enter
        </Typography>
      </Box>
    </Box>
  );
};

export default StockAudit;

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