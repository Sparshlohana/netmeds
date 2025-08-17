// Admin/Tables/Categories/Categories.jsx

import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, Pagination, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

// Mock data for categories
const initialMockCategories = [
  { _id: "cat1", name: "Electronics", description: "Electronic gadgets and devices", level: 1 },
  { _id: "cat2", name: "Apparel", description: "Clothing and accessories", level: 1 },
  { _id: "cat3", name: "Home Goods", description: "Items for home decor and utility", level: 2 },
  { _id: "cat4", name: "Pharmacy", description: "Medicines and health products", level: 1 },
  { _id: "cat5", name: "Beauty", description: "Beauty and personal care products", level: 2 },
  { _id: "cat6", name: "Books", description: "Books and literature", level: 3 },
  { _id: "cat7", name: "Sports", description: "Sports equipment and apparel", level: 1 },
  { _id: "id_sub_cat_1", name: "Smartphones", description: "Mobile phones and accessories", level: 2, parentCategory: "cat1" },
  { _id: "id_sub_cat_2", name: "Laptops", description: "Portable computers", level: 2, parentCategory: "cat1" },
  { _id: "id_sub_cat_3", name: "T-Shirts", description: "Casual wear t-shirts", level: 2, parentCategory: "cat2" },
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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': { color: 'gray' },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: '#333' },
    '&:hover fieldset': { borderColor: '#555' },
    '&.Mui-focused fieldset': { borderColor: '#f06292' },
  },
  '& .MuiSelect-icon': { color: 'gray' },
}));

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]); // All categories for filtering
  const [filteredCategories, setFilteredCategories] = useState([]); // Categories after filter/sort
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState({
    level: "",
    sort: "name_asc",
  });
  const [page, setPage] = useState(1);
  const pageSize = 10; // Items per page

  // Simulate fetching categories
  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setAllCategories(initialMockCategories);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filtering and sorting whenever dependencies change
  useEffect(() => {
    let currentCategories = [...allCategories];

    // Filter by level
    if (filterValue.level !== "") {
      currentCategories = currentCategories.filter(cat => cat.level === parseInt(filterValue.level));
    }

    // Sort by name
    currentCategories.sort((a, b) => {
      if (filterValue.sort === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (filterValue.sort === "name_desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    setFilteredCategories(currentCategories);
    setPage(1); // Reset to first page on filter/sort change
  }, [allCategories, filterValue]);


  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (e, filterName) => {
    setFilterValue((prev) => ({
      ...prev,
      [filterName]: e.target.value,
    }));
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm(`Are you sure you want to delete category with ID: ${categoryId}?`)) {
      setAllCategories(prev => prev.filter(cat => cat._id !== categoryId)); // Update allCategories
      alert(`Category ${categoryId} deleted! (Simulated)`);
    }
  };

  const handleEditCategory = (categoryId) => {
    console.log("Edit category:", categoryId);
    // In a real app, you would navigate to an edit form
    // navigate(`/admin/category/update/${categoryId}`);
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
        No Categories Found!
      </Typography>
    </Box>
  );

  // Calculate categories for current page
  const paginatedCategories = (() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, page, pageSize]);

  const totalPages = Math.ceil(filteredCategories.length / pageSize);

  if (loading) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: '#f06292' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alert severity="error" sx={{ backgroundColor: '#f4433622', color: '#f44336' }}>{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Category Listing
        </Typography>
        <ActionButton startIcon={<AddCircleOutlineIcon />} onClick={() => navigate('/admin/category/create')}>
          Add New Category
        </ActionButton>
      </Box>
      <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
        Manage your product categories
      </Typography>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f', mb: 4 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>Filter Categories</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <StyledFormControl sx={{ minWidth: 120, flexGrow: 1 }}>
            <InputLabel id="level-select-label">Level</InputLabel>
            <Select
              labelId="level-select-label"
              id="level-select"
              value={filterValue.level}
              label="Level"
              onChange={(e) => handleFilterChange(e, "level")}
            >
              <MenuItem value="" sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>All Levels</MenuItem>
              <MenuItem value={1} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Level 1</MenuItem>
              <MenuItem value={2} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Level 2</MenuItem>
              <MenuItem value={3} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Level 3</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl sx={{ minWidth: 120, flexGrow: 1 }}>
            <InputLabel id="sort-select-label">Sort By Name</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={filterValue.sort}
              label="Sort By Name"
              onChange={(e) => handleFilterChange(e, "sort")}
            >
              <MenuItem value={"name_asc"} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>A - Z</MenuItem>
              <MenuItem value={"name_desc"} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>Z - A</MenuItem>
            </Select>
          </StyledFormControl>
        </Box>
      </Card>

      <Card sx={{ backgroundColor: '#1b1b36', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        {paginatedCategories.length > 0 ? (
          <TableContainer sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="categories table">
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid #333' }}>
                  <TableCell sx={{ color: 'gray', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'gray', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'gray', fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ textAlign: "center", color: 'gray', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCategories.map((category) => (
                  <TableRow
                    hover
                    key={category._id}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 }, borderBottom: '1px solid #2e2e4f' }}
                  >
                    <TableCell sx={{ color: 'white' }}>{category._id}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{category.name}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{category.description}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button 
                        variant="text" 
                        onClick={() => handleEditCategory(category._id)} 
                        sx={{ color: '#5e35b1', '&:hover': { backgroundColor: 'rgba(94, 53, 177, 0.1)' }, mr: 1 }}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="text" 
                        onClick={() => handleDeleteCategory(category._id)} 
                        sx={{ color: '#f06292', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EmptyStateIllustration />
        )}
      </Card>
      <Card sx={{ mt: 2, p: 2, backgroundColor: '#1b1b36', borderRadius: '8px', boxShadow: 'none', border: '1px solid #2e2e4f' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={handlePaginationChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#f06292',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#c8507a',
                },
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Categories;
