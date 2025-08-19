// Admin/Views/Products.jsx

import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { green } from "@mui/material/colors";

// Mock data for products and categories
const mockProducts = {
  content: [
    { _id: "prod1", imageUrl: "https://placehold.co/56x56/FF0000/FFFFFF?text=P1", title: "Red T-Shirt", brand: "BrandX", discountedPrice: 15.99, price: 20.00, category: { _id: "cat2", name: "Apparel" }, colors: [{ name: "Red", sizes: [{ size: "M", quantity: 5 }] }] },
    { _id: "prod2", imageUrl: "https://placehold.co/56x56/0000FF/FFFFFF?text=P2", title: "Blue Jeans", brand: "DenimCo", discountedPrice: 35.50, price: 50.00, category: { _id: "cat2", name: "Apparel" }, sizes: [{ size: "32", quantity: 8 }] },
    { _id: "prod3", imageUrl: "https://placehold.co/56x56/00FF00/000000?text=P3", title: "Smartwatch", brand: "TechGadget", discountedPrice: 99.00, price: 120.00, category: { _id: "cat1", name: "Electronics" }, sizes: [{ size: "OS", quantity: 3 }] },
    { _id: "prod4", imageUrl: "https://placehold.co/56x56/FFFF00/000000?text=P4", title: "Pain Reliever", brand: "PharmaCo", discountedPrice: 8.75, price: 10.00, category: { _id: "cat4", name: "Pharmacy" }, sizes: [{ size: "50ct", quantity: 20 }] },
    { _id: "prod5", imageUrl: "https://placehold.co/56x56/FF00FF/FFFFFF?text=P5", title: "Coffee Maker", brand: "HomeBrew", discountedPrice: 45.00, price: 60.00, category: { _id: "cat3", name: "Home Goods" }, sizes: [{ size: "Std", quantity: 2 }] },
    { _id: "prod6", imageUrl: "https://placehold.co/56x56/00FFFF/000000?text=P6", title: "Vitamin C", brand: "HealthSupp", discountedPrice: 12.00, price: 15.00, category: { _id: "cat4", name: "Pharmacy" }, sizes: [{ size: "100ct", quantity: 15 }] },
  ],
  totalPages: 2,
  totalElements: 12,
};

const mockCategories = [
  { _id: "cat1", name: "Electronics" },
  { _id: "cat2", name: "Apparel" },
  { _id: "cat3", name: "Home Goods" },
  { _id: "cat4", name: "Pharmacy" },
];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': { color: '#757575' },
  '& .MuiOutlinedInput-root': {
    color: 'black',
    backgroundColor: '#FFFFFF',
    '& fieldset': { borderColor: '#E0E0E0' },
    '&:hover fieldset': { borderColor: '#BDBDBD' },
    '&.Mui-focused fieldset': { borderColor: green[500] },
  },
  '& .MuiSelect-icon': { color: '#757575' },
}));

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState({ products: { content: [], totalPages: 1 } });
  const [categoriesData, setCategoriesData] = useState({ categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setCategoriesData({ categories: mockCategories });
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      let filtered = [...mockProducts.content];

      if (category || filterValue.category) {
        const selectedCategoryId = category || filterValue.category;
        filtered = filtered.filter(p => p.category?._id === selectedCategoryId);
      }

      if (availability === "in_stock") {
        filtered = filtered.filter(p => {
          const totalQty = p.colors.length > 0
            ? p.colors.reduce((total, color) => total + color.sizes.reduce((sum, size) => sum + size.quantity, 0), 0)
            : (p.sizes ? p.sizes.reduce((total, size) => total + size.quantity, 0) : 0);
          return totalQty > 0;
        });
      } else if (availability === "out_of_stock") {
        filtered = filtered.filter(p => {
          const totalQty = p.colors.length > 0
            ? p.colors.reduce((total, color) => total + color.sizes.reduce((sum, size) => sum + size.quantity, 0), 0)
            : (p.sizes ? p.sizes.reduce((total, size) => total + size.quantity, 0) : 0);
          return totalQty === 0;
        });
      }

      const currentSort = sort || filterValue.sort || "price_low";
      filtered.sort((a, b) => {
        if (currentSort === "price_low") return a.discountedPrice - b.discountedPrice;
        if (currentSort === "price_high") return b.discountedPrice - a.discountedPrice;
        if (currentSort === "name_asc") return a.title.localeCompare(b.title);
        if (currentSort === "name_desc") return b.title.localeCompare(a.title);
        return 0;
      });

      const currentPage = parseInt(page) || 1;
      const pageSize = 10;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginated = filtered.slice(startIndex, endIndex);

      setProductsData({
        products: {
          content: paginated,
          totalPages: Math.ceil(filtered.length / pageSize),
          totalElements: filtered.length,
        },
      });
      setLoading(false);
    }, 500);
  }, [availability, category, sort, page, filterValue.category, filterValue.sort]);


  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  
  const handleFilterChange = (e, sectionId) => {
    const value = e.target.value;
    setFilterValue((values) => ({ ...values, [sectionId]: value }));

    searchParams.set(sectionId, value);
    searchParams.set("page", 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      setProductsData(prev => ({
        products: {
          ...prev.products,
          content: prev.products.content.filter(p => p._id !== productId)
        }
      }));
      alert(`Product ${productId} deleted! (Simulated)`);
    }
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/admin/product/update/${productId}`);
  };

  const handleDeleteAllProducts = async () => {
    if (window.confirm("Are you sure you want to delete all products? This action cannot be undone.")) {
      setProductsData(prev => ({
        products: {
          ...prev.products,
          content: []
        }
      }));
      alert("All products deleted! (Simulated)");
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Typography variant="h5" component="h1" sx={{ mb: 1, fontWeight: 'bold', color: 'darkgreen' }}>
        Products Listing
      </Typography>
      <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>
        Manage your product inventory
      </Typography>

      <Card sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0', mb: 4 }}>
        <CardHeader
          title={<Typography variant="h6" sx={{ color: 'darkgreen', fontWeight: 'bold' }}>Sort & Filter Products</Typography>}
          sx={{ pt: 0, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledFormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                {categoriesData?.categories?.map((item) => (
                  <MenuItem key={item._id} value={item._id} sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledFormControl fullWidth>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={filterValue.sort}
                label="Sort By"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value="price_low" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Price: Low to High</MenuItem>
                <MenuItem value="price_high" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Price: High to Low</MenuItem>
                <MenuItem value="name_asc" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Name: A-Z</MenuItem>
                <MenuItem value="name_desc" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Name: Z-A</MenuItem>
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledFormControl fullWidth>
              <InputLabel id="availability-select-label">Availability</InputLabel>
              <Select
                labelId="availability-select-label"
                id="availability-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value="" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>All</MenuItem>
                <MenuItem value="in_stock" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>In Stock</MenuItem>
                <MenuItem value="out_of_stock" sx={{ backgroundColor: '#FFFFFF', color: 'black', '&:hover': { backgroundColor: '#F0F0F0' } }}>Out of Stock</MenuItem>
              </Select>
            </StyledFormControl>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        <CardHeader
          title={<Typography variant="h6" sx={{ color: 'darkgreen', fontWeight: 'bold' }}>All Products</Typography>}
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
          action={
            <Button
              variant="contained"
              sx={{ backgroundColor: '#f06292', '&:hover': { backgroundColor: '#c8507a' }, textTransform: 'none', fontWeight: 'bold' }}
              onClick={handleDeleteAllProducts}
            >
              Delete All Products
            </Button>
          }
        />
        <TableContainer sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 800, tableLayout: 'fixed' }} aria-label="products table">
            <TableHead>
              <TableRow sx={{ borderBottom: '1px solid #E0E0E0' }}>
                <TableCell sx={{ color: 'darkgreen', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ color: 'darkgreen', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ textAlign: "center", color: 'darkgreen', fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center", color: 'darkgreen', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center", color: 'darkgreen', fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center", color: 'darkgreen', fontWeight: 'bold' }}>Delete</TableCell>
                <TableCell sx={{ textAlign: "center", color: 'darkgreen', fontWeight: 'bold' }}>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData?.products?.content?.length > 0 ? (
                productsData.products.content.map((item) => (
                  <TableRow
                    hover
                    key={item._id}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 }, borderBottom: '1px solid #E0E0E0' }}
                  >
                    <TableCell sx={{ width: '10%' }}>
                      <Avatar alt={item.title} src={item.imageUrl} sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important`, color: 'black', width: '25%' }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                            color: 'black'
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#616161' }}>{item.brand}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: 'black', width: '15%' }}>{item.category?.name}</TableCell>
                    <TableCell sx={{ textAlign: "center", color: 'black', width: '10%' }}>${item.discountedPrice}</TableCell>
                    <TableCell sx={{ textAlign: "center", color: 'black', width: '10%' }}>
                      {item.colors && item.colors.length > 0
                        ? item.colors.reduce((total, color) =>
                            total + color.sizes.reduce((sum, size) => sum + size.quantity, 0), 0)
                        : (item.sizes ? item.sizes.reduce((total, size) => total + size.quantity, 0) : 0)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", width: '15%' }}>
                      <Button
                        variant="text"
                        onClick={() => handleDeleteProduct(item._id)}
                        sx={{ color: '#f06292', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", width: '15%' }}>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdateProduct(item._id)}
                        sx={{ backgroundColor: green[600], '&:hover': { backgroundColor: green[700] }, textTransform: 'none', fontWeight: 'bold' }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" sx={{ color: '#616161', mt: 2 }}>
                      No products found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card sx={{ mt: 2, p: 2, backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Pagination
            count={productsData.products?.totalPages || 1}
            page={parseInt(page) || 1}
            color="primary"
            onChange={handlePaginationChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'black',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: green[600],
                color: 'white',
                '&:hover': {
                  backgroundColor: green[700],
                },
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Products;