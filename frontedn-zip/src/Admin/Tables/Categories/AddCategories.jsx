// Admin/Tables/Categories/AddCategories.jsx

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: 'white',
    backgroundColor: '#1b1b36',
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
  '& .MuiInputLabel-root': {
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
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Typography variant="h5" component="h1" sx={{ textAlign: "center", mb: 4, fontWeight: 'bold' }}>
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
            {/* <StyledFormControl fullWidth> */}
              <InputLabel>Level</InputLabel>
              <StyledSelect
                name="level"
                value={categoryData.level}
                onChange={handleChange}
                label="Level"
                required
              >
                <MenuItem value={1} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Level 1</MenuItem>
                <MenuItem value={2} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Level 2</MenuItem>
                <MenuItem value={3} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Level 3</MenuItem>
              </StyledSelect>
            {/* </StyledFormControl> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1.8, backgroundColor: '#f06292', '&:hover': { backgroundColor: '#c8507a' }, textTransform: 'none', fontWeight: 'bold' }}
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
