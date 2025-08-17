// Admin/Views/CreateProduct.jsx

import { useState, useEffect, Fragment } from "react";
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for removing color/size
import { styled } from '@mui/material/styles'; // Import styled for custom components

// Mock data for categories, since Redux actions are removed
const mockCategories = [
  { _id: "cat1", name: "Electronics" },
  { _id: "cat2", name: "Apparel" },
  { _id: "cat3", name: "Home Goods" },
  { _id: "cat4", name: "Pharmacy" },
];

const defaultSizes = [
  { size: "S", quantity: 0 },
  { size: "M", quantity: 0 },
  { size: "L", quantity: 0 },
];

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
  '& .MuiInputAdornment-root': {
    color: 'gray',
  },
  '& .MuiFormLabel-root': {
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

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    colors: [
      { name: "", sizes: defaultSizes.map(size => ({ ...size })) }
    ],
    discountedPrice: "",
    price: "",
    discountPersent: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();

  // Using local state for categories and loading/error, as Redux is removed
  const [categories, setCategories] = useState({ categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching categories
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setCategories({ categories: mockCategories });
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...productData, [name]: value };

    // Automatically calculate discounted price if price or discount percentage changes
    if (name === "price" || name === "discountPersent") {
      const price = parseFloat(updatedData.price) || 0;
      const discountPersent = parseFloat(updatedData.discountPersent) || 0;
      updatedData.discountedPrice = (price - (price * discountPersent) / 100).toFixed(2);
    }

    setProductData(updatedData);
  };

  const handleColorChange = (e, colorIndex) => {
    const { name, value } = e.target;
    const colors = [...productData.colors];
    colors[colorIndex][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  const handleSizeChange = (e, colorIndex, sizeIndex) => {
    const { name, value } = e.target;
    const colors = [...productData.colors];
    colors[colorIndex].sizes[sizeIndex][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  const handleAddSize = (colorIndex) => {
    const colors = [...productData.colors];
    colors[colorIndex].sizes.push({ size: "", quantity: 0 });
    setProductData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  const handleRemoveSize = (colorIndex, sizeIndex) => {
    const colors = [...productData.colors];
    colors[colorIndex].sizes.splice(sizeIndex, 1);
    setProductData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  const handleAddColor = () => {
    setProductData((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, { name: "", sizes: defaultSizes.map(size => ({ ...size })) }],
    }));
  };

  const handleRemoveColor = (colorIndex) => {
    const colors = [...productData.colors];
    colors.splice(colorIndex, 1);
    setProductData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send productData to your backend API here
    console.log("Submitting Product Data:", productData);
    // Simulate API call success
    alert("Product added successfully! (Simulated)");
    // Navigate to the products listing page after submission
    navigate("/admin/products");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#0d0d1a', minHeight: 'calc(100vh - 64px)', color: 'white' }}>
      <Typography variant="h5" component="h1" sx={{ textAlign: "center", mb: 4, fontWeight: 'bold' }}>
        Add New Product
      </Typography>
      {loading && <Typography sx={{ color: 'gray' }}>Loading categories...</Typography>}
      {error && <Typography color="error">Error loading categories: {error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          {/* Colors and Sizes Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Product Colors & Sizes</Typography>
            {productData.colors.map((color, colorIndex) => (
              <Box key={colorIndex} sx={{ border: '1px solid #333', borderRadius: '8px', p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      label="Color Name"
                      name="name"
                      value={color.name}
                      onChange={(event) => handleColorChange(event, colorIndex)}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveColor(colorIndex)}
                      disabled={productData.colors.length <= 1}
                      sx={{ textTransform: 'none', fontWeight: 'bold', borderColor: '#f44336', color: '#f44336', '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
                      startIcon={<DeleteIcon />}
                    >
                      Remove Color
                    </Button>
                  </Grid>
                </Grid>

                {color.sizes.map((size, sizeIndex) => (
                  <Grid container spacing={2} alignItems="center" key={sizeIndex} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={5}>
                      <StyledTextField
                        label="Size Name (e.g., S, M, L)"
                        name="size"
                        value={size.size}
                        onChange={(event) => handleSizeChange(event, colorIndex, sizeIndex)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <StyledTextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={size.quantity}
                        onChange={(event) => handleSizeChange(event, colorIndex, sizeIndex)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
                        disabled={color.sizes.length <= 1}
                        sx={{ '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" color="primary" onClick={() => handleAddSize(colorIndex)} sx={{ textTransform: 'none', fontWeight: 'bold', borderColor: '#5e35b1', color: '#5e35b1', '&:hover': { backgroundColor: 'rgba(94, 53, 177, 0.1)' } }}>
                    Add Size
                  </Button>
                </Box>
              </Box>
            ))}

            <Grid item xs={12}>
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" color="primary" onClick={handleAddColor} sx={{ textTransform: 'none', fontWeight: 'bold', borderColor: '#f06292', color: '#f06292', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}>
                  Add Color
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Pricing and Category Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: 'white', mt: 3, mb: 2 }}>Pricing & Category</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <StyledTextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StyledTextField
                  fullWidth
                  label="Discount Percentage"
                  name="discountPersent"
                  value={productData.discountPersent}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StyledTextField
                  fullWidth
                  label="Discounted Price"
                  name="discountedPrice"
                  value={productData.discountedPrice}
                  disabled
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{
                  '& .MuiInputLabel-root': { color: 'gray' },
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: '#333' },
                    '&:hover fieldset': { borderColor: '#555' },
                    '&.Mui-focused fieldset': { borderColor: '#f06292' },
                  },
                  '& .MuiSelect-icon': { color: 'gray' }
                }}>
                  <InputLabel>Category</InputLabel>
                  <StyledSelect name="category" value={productData.category} onChange={handleChange} label="Category">
                    {categories && categories.categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id} sx={{ backgroundColor: '#1b1b36', color: 'white', '&:hover': { backgroundColor: '#2e2e4f' } }}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Description Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: 'white', mt: 3, mb: 2 }}>Description</Typography>
            <StyledTextField
              fullWidth
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              name="description"
              rows={4}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1.8, backgroundColor: '#f06292', '&:hover': { backgroundColor: '#c8507a' }, textTransform: 'none', fontWeight: 'bold' }}
              fullWidth
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add New Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateProduct;
