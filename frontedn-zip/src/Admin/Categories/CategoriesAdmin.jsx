// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Button,
//     Card,
//     CardHeader,
//     FormControl,
//     Grid,
//     InputLabel,
//     MenuItem,
//     Pagination,
//     Select,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     CircularProgress,
//     Alert,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { findCategories, deleteCategory } from "../../Redux/Customers/Categories/Action";

// const CategoriesTable = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { categories, loading, error } = useSelector((state) => state);  // Extract loading and error state
//     const [filterValue, setFilterValue] = useState({
//         sort: "",
//         level: "",
//     });

//     const [page, setPage] = useState(1);

//     useEffect(() => {
//         const data = {
//             sort: filterValue.sort || "name_asc",
//             level: filterValue.level || "",
//             pageNumber: page,
//             pageSize: 10,
//         };
//         dispatch(findCategories(data));
//     }, [dispatch, filterValue, page]);

//     const handlePaginationChange = (event, value) => {
//         setPage(value);
//     };

//     const handleFilterChange = (e, filterName) => {
//         setFilterValue((prev) => ({
//             ...prev,
//             [filterName]: e.target.value,
//         }));
//     };

//     const handleDeleteCategory = (categoryId) => {
//         dispatch(deleteCategory(categoryId));
//     };

//     const handleUpdateCategory = (categoryId) => {
//         navigate(`/admin/category/update/${categoryId}`);
//     };

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" mt={4}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box display="flex" justifyContent="center" mt={4}>
//                 <Alert severity="error">{error}</Alert>
//             </Box>
//         );
//     }

//     return (
//         <Box width={"100%"}>
//             <Card className="p-3">
//                 <CardHeader
//                     title="Filter Categories"
//                     sx={{
//                         pt: 0,
//                         alignItems: "center",
//                         "& .MuiCardHeader-action": { mt: 0.6 },
//                     }}
//                 />
//                 <Grid container spacing={2}>
//                     {/* Level Filter */}
//                     <Grid item xs={6}>
//                         <FormControl fullWidth>
//                             <InputLabel id="level-select-label">Level</InputLabel>
//                             <Select
//                                 labelId="level-select-label"
//                                 id="level-select"
//                                 value={filterValue.level}
//                                 label="Level"
//                                 onChange={(e) => handleFilterChange(e, "level")}
//                             >
//                                 <MenuItem value="">All Levels</MenuItem>
//                                 <MenuItem value={1}>Level 1</MenuItem>
//                                 <MenuItem value={2}>Level 2</MenuItem>
//                                 <MenuItem value={3}>Level 3</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     {/* Sort Filter */}
//                     <Grid item xs={6}>
//                         <FormControl fullWidth>
//                             <InputLabel id="sort-select-label">Sort By Name</InputLabel>
//                             <Select
//                                 labelId="sort-select-label"
//                                 id="sort-select"
//                                 value={filterValue.sort}
//                                 label="Sort By Name"
//                                 onChange={(e) => handleFilterChange(e, "sort")}
//                             >
//                                 <MenuItem value={"name_asc"}>A - Z</MenuItem>
//                                 <MenuItem value={"name_desc"}>Z - A</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                 </Grid>
//             </Card>
//             <Card className="mt-2">
//                 <CardHeader
//                     title="All Categories"
//                     sx={{
//                         pt: 2,
//                         alignItems: "center",
//                         "& .MuiCardHeader-action": { mt: 0.6 },
//                     }}
//                     action={
//                         <Button variant="contained" onClick={() => navigate("/admin/category/create")}>
//                             Add Category
//                         </Button>
//                     }
//                 />
//                 <TableContainer>
//                     <Table sx={{ minWidth: 800 }} aria-label="categories table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {categories?.categories?.map((category) => (
//                                 <TableRow
//                                     hover
//                                     key={category?._id}
//                                     sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
//                                 >
//                                     <TableCell>
//                                         <Typography
//                                             sx={{
//                                                 fontWeight: 500,
//                                                 fontSize: "0.875rem !important",
//                                             }}
//                                         >
//                                             {category?.name}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         <Button variant="text" onClick={() => handleDeleteCategory(category?._id)}>
//                                             Delete
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Card>
//             <Card className="mt-2 border">
//                 <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
//                     <Pagination
//                         count={categories?.totalPages || 1}
//                         color="primary"
//                         page={page}
//                         onChange={handlePaginationChange}
//                     />
//                 </div>
//             </Card>
//         </Box>
//     );
// };

// export default CategoriesTable;
