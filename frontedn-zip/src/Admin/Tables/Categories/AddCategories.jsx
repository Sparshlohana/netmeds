// Admin/Tables/Categories/AddCategories.jsx

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';

const StyledTextField = styled(TextField)(({ theme }) => ({
 '& .MuiInputBase-root': {
   color: 'black',
   backgroundColor: '#FFFFFF',
   borderRadius: '8px',
   border: '1px solid #E0E0E0',
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
 '& .MuiInputLabel-root': {
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

const AddCategories = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    level: 1, // Default level 1
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to add category
    setTimeout(() => {
      console.log('Adding Category:', categoryData);
      alert(`Category "${categoryData.name}" added successfully! (Simulated)`);
      setLoading(false);
      setCategoryData({ name: "", description: "", level: 1 }); // Reset form
      navigate('/admin/categories'); // Navigate back to category listing
    }, 1000);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Typography variant="h5" component="h1" sx={{ textAlign: "center", mb: 4, fontWeight: 'bold', color: 'darkgreen' }}>
        Add New Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledTextField
              fullWidth
              label="Category Name"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField
              fullWidth
              label="Category Description"
              name="description"
              multiline
              rows={3}
              value={categoryData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#757575' }}>Level</InputLabel>
              <StyledSelect
                name="level"
                value={categoryData.level}
                onChange={handleChange}
                label="Level"
                required
              >
                <MenuItem value={1} sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Level 1</MenuItem>
                <MenuItem value={2} sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Level 2</MenuItem>
                <MenuItem value={3} sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Level 3</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1.8, backgroundColor: green[600], '&:hover': { backgroundColor: green[700] }, textTransform: 'none', fontWeight: 'bold' }}
              fullWidth
              disabled={loading}
            >
              {loading ? "Adding Category..." : "Add New Category"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddCategories;