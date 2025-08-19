// Admin/Tables/Categories/CategoriesTable.jsx

import React, { useEffect, useState } from "react";
import {
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
    CircularProgress,
    Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Mock data for demonstration purposes, as Redux state is not provided
const mockCategories = {
    content: [
        { _id: "cat1", name: "Electronics", description: "Electronic gadgets and devices", level: 1 },
        { _id: "cat2", name: "Apparel", description: "Clothing and accessories", level: 1 },
        { _id: "cat3", name: "Home Goods", description: "Items for home decor and utility", level: 2 },
        { _id: "cat4", name: "Pharmacy", description: "Medicines and health products", level: 1 },
        { _id: "cat5", name: "Beauty", description: "Beauty and personal care products", level: 2 },
        { _id: "cat6", name: "Books", description: "Books and literature", level: 3 },
    ],
    totalPages: 3,
};

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
    width: '100%',
}));


const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Using mock data since Redux state is not available
    const { categories, loading, error } = { categories: mockCategories, loading: false, error: null };
    const [filterValue, setFilterValue] = useState({
        sort: "name_asc",
        level: "",
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        // Mocking the dispatch call with a simple log
        console.log("Fetching categories with filters:", {
            sort: filterValue.sort || "name_asc",
            level: filterValue.level || "",
            pageNumber: page,
            pageSize: 10,
        });
        // In a real app, this would be: dispatch(findCategories(data));
    }, [dispatch, filterValue, page]);

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
        // Mocking the dispatch call with a simple log
        console.log("Deleting category:", categoryId);
        // In a real app, this would be: dispatch(deleteCategory(categoryId));
    };

    const handleUpdateCategory = (categoryId) => {
        navigate(`/admin/category/update/${categoryId}`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4} sx={{ color: green[600] }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box width={"100%"} sx={{ backgroundColor: '#F5F5F5', p: 2 }}>
            <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0', mb: 4 }}>
                <CardHeader
                    title={<Typography variant="h6" sx={{ color: 'darkgreen', fontWeight: 'bold' }}>Filter Categories</Typography>}
                    sx={{
                        pt: 0,
                        alignItems: "center",
                        "& .MuiCardHeader-action": { mt: 0.6 },
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <StyledFormControl>
                            <InputLabel id="level-select-label">Level</InputLabel>
                            <Select
                                labelId="level-select-label"
                                id="level-select"
                                value={filterValue.level}
                                label="Level"
                                onChange={(e) => handleFilterChange(e, "level")}
                            >
                                <MenuItem value="">All Levels</MenuItem>
                                <MenuItem value={1}>Level 1</MenuItem>
                                <MenuItem value={2}>Level 2</MenuItem>
                                <MenuItem value={3}>Level 3</MenuItem>
                            </Select>
                        </StyledFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledFormControl>
                            <InputLabel id="sort-select-label">Sort By Name</InputLabel>
                            <Select
                                labelId="sort-select-label"
                                id="sort-select"
                                value={filterValue.sort}
                                label="Sort By Name"
                                onChange={(e) => handleFilterChange(e, "sort")}
                            >
                                <MenuItem value={"name_asc"}>A - Z</MenuItem>
                                <MenuItem value={"name_desc"}>Z - A</MenuItem>
                            </Select>
                        </StyledFormControl>
                    </Grid>
                </Grid>
            </Card>

            <Card className="mt-2" sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                <CardHeader
                    title={<Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>All Categories</Typography>}
                    action={
                        <ActionButton
                            variant="contained"
                            onClick={() => navigate("/admin/category/create")}
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add Category
                        </ActionButton>
                    }
                />
                <TableContainer>
                    <Table sx={{ minWidth: 800, tableLayout: 'fixed' }} aria-label="categories table">
                        <TableHead>
                            <TableRow sx={{ borderBottom: '1px solid #E0E0E0' }}>
                                <TableCell sx={{ color: 'darkgreen', fontWeight: 'bold', width: '15%' }}>ID</TableCell>
                                <TableCell sx={{ color: 'darkgreen', fontWeight: 'bold', width: '20%' }}>Name</TableCell>
                                <TableCell sx={{ color: 'darkgreen', fontWeight: 'bold', width: '30%' }}>Description</TableCell>
                                <TableCell sx={{ color: 'darkgreen', fontWeight: 'bold', width: '10%' }}>Level</TableCell>
                                <TableCell sx={{ textAlign: "center", color: 'darkgreen', fontWeight: 'bold', width: '25%' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories?.content?.length > 0 ? (
                                categories.content.map((category) => (
                                    <TableRow
                                        hover
                                        key={category?._id}
                                        sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 }, borderBottom: '1px solid #E0E0E0' }}
                                    >
                                        <TableCell sx={{ color: 'black' }}>{category._id}</TableCell>
                                        <TableCell sx={{ color: 'black' }}>{category.name}</TableCell>
                                        <TableCell sx={{ color: 'black' }}>{category.description}</TableCell>
                                        <TableCell sx={{ color: 'black' }}>{category.level}</TableCell>
                                        <TableCell sx={{ textAlign: "center", display: 'flex', gap: 1, justifyContent: 'center' }}>
                                            <Button
                                                variant="text"
                                                onClick={() => handleUpdateCategory(category?._id)}
                                                startIcon={<EditIcon />}
                                                sx={{ color: green[600], '&:hover': { backgroundColor: 'rgba(0, 128, 0, 0.1)' } }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="text"
                                                onClick={() => handleDeleteCategory(category?._id)}
                                                startIcon={<DeleteIcon />}
                                                sx={{ color: '#f06292', '&:hover': { backgroundColor: 'rgba(240, 98, 146, 0.1)' } }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="body1" sx={{ color: '#616161', mt: 2 }}>
                                            No categories found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {categories?.totalPages > 1 && (
                <Card sx={{ mt: 2, p: 2, backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Pagination
                            count={categories.totalPages}
                            color="primary"
                            page={page}
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
            )}
        </Box>
    );
};

export default Categories;