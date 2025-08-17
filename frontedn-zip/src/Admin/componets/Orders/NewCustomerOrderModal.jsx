// components/Orders/NewCustomerOrderModal.jsx

import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Select, MenuItem, FormControlLabel, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxHeight: '90vh',
  bgcolor: '#1b1b36',
  border: '1px solid #333',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  overflowY: 'auto',
  color: 'white',
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: 'white',
    backgroundColor: '#0d0d1a',
    borderRadius: '8px',
    border: '1px solid #333',
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
  '& .MuiFormLabel-root': {
    color: 'gray',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '10px 20px',
  color: 'white',
  backgroundColor: '#5e35b1',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    backgroundColor: '#4527a0',
  },
}));

const TableHeaderCell = styled(TableCell)({
  color: 'rgba(255, 255, 255, 0.8)',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  borderBottom: '1px solid #333',
});

const TableBodyCell = styled(TableCell)({
  color: 'white',
  fontSize: '0.875rem',
  borderBottom: '1px solid #2e2e4f',
});

const AddProductButton = styled(IconButton)({
  backgroundColor: '#f06292',
  color: 'white',
  '&:hover': {
    backgroundColor: '#c8507a',
  },
});

const NewCustomerOrderModal = ({ open, handleClose }) => {
  const [customer, setCustomer] = useState('');
  const [patient, setPatient] = useState('');
  const [poReference, setPoReference] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('home delivery');
  const [notifyCustomer, setNotifyCustomer] = useState(false);

  // Mock product state
  const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState([
    { name: 'Product 1', rx: 'Rx', stk: 10, qty: 1, mrp: 150, saleRate: 140, disc: 5, gst: 18, amount: 140 * 1.18 * 1 },
  ]);

  const handleSaveOrder = () => {
    console.log('Order Saved:', { customer, patient, poReference, deliveryOption, notifyCustomer, products });
    handleClose();
  };

  const handleProductAdd = () => {
    // Add logic to add a new product to the list
    console.log('Adding new product...');
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={ModalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            New Customer Order <span style={{ color: 'gray', fontWeight: 'normal' }}>(Ctrl + Alt + O)</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ActionButton onClick={handleSaveOrder}>
              Save Order (12)
            </ActionButton>
            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
          Fill in the details below to add a new order
        </Typography>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={3}>
            <StyledTextField
              label="CUSTOMER"
              placeholder="Type or hit space"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              fullWidth
              required // Mark as required
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <StyledTextField
              label=" PATIENT"
              placeholder="Type or hit space"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              fullWidth
              required // Mark as required
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <StyledTextField
              label="PO Reference"
              placeholder="Enter ref no here"
              value={poReference}
              onChange={(e) => setPoReference(e.target.value)}
              fullWidth
              required // Mark as required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Select
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
              fullWidth
              sx={{
                color: 'white', backgroundColor: '#0d0d1a', border: '1px solid #333', borderRadius: '8px',
                '& .MuiSelect-select': { padding: '10px 14px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              }}
            >
              <MenuItem value="home delivery">Home delivery</MenuItem>
              <MenuItem value="store pickup">Store pickup</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControlLabel
              control={<Checkbox checked={notifyCustomer} onChange={(e) => setNotifyCustomer(e.target.checked)} sx={{ color: 'gray' }} />}
              label="Notify if ready"
              sx={{ color: 'white' }}
            />
          </Grid>
        </Grid>

        <Box>
          <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>PRODUCT</Typography>
          <Grid container spacing={1} alignItems="center">
            {/* Decreased length of Search Product Name */}
            <Grid item xs={12} md={3}> 
              <StyledTextField
                placeholder="Search Product Name"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="RX" fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="STK" fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="QTY" fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="MRP" fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="SALE RT" fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="DISC %" fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <StyledTextField label="GST" fullWidth />
            </Grid>
            {/* Increased length of Amount section */}
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StyledTextField label="Amount" fullWidth />
                <AddProductButton onClick={handleProductAdd}>
                  <AddIcon />
                </AddProductButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>PRODUCT</TableHeaderCell>
                <TableHeaderCell>RX</TableHeaderCell>
                <TableHeaderCell>STK</TableHeaderCell>
                <TableHeaderCell>QTY</TableHeaderCell>
                <TableHeaderCell>MRP</TableHeaderCell>
                <TableHeaderCell>SALE RT</TableHeaderCell>
                <TableHeaderCell>DISC %</TableHeaderCell>
                <TableHeaderCell>GST</TableHeaderCell>
                <TableHeaderCell>AMOUNT</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableBodyCell>{product.name}</TableBodyCell>
                  <TableBodyCell>{product.rx}</TableBodyCell>
                  <TableBodyCell>{product.stk}</TableBodyCell>
                  <TableBodyCell>{product.qty}</TableBodyCell>
                  <TableBodyCell>{product.mrp}</TableBodyCell>
                  <TableBodyCell>{product.saleRate}</TableBodyCell>
                  <TableBodyCell>{product.disc}</TableBodyCell>
                  <TableBodyCell>{product.gst}</TableBodyCell>
                  <TableBodyCell>{product.amount.toFixed(2)}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" sx={{ color: 'gray' }}>
            To Go Ahead - Enter | To Go Back - Shift + Tab | To Close - ESC
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewCustomerOrderModal;