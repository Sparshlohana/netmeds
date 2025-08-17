// import { useState, useEffect } from "react";
// import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createCategory, findCategories } from "../../Redux/Customers/Categories/Action";

// const CreateCategoryForm = () => {
//     const [categoryData, setCategoryData] = useState({
//         name: "",
//         description: "",
//         level: 1, // Default level 1
//     });

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Get categories from Redux
//     const { categories } = useSelector((state) => state); // Replace `state` with the exact state slice

//     // Fetch categories when component mounts
//     useEffect(() => {
//         dispatch(findCategories());
//     }, [dispatch]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCategoryData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(createCategory({ data: categoryData }));
//         navigate("/admin/categories");
//     };

//     return (
//         <Fragment className="createCategoryContainer">
//             <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10 text-center">
//                 Add New Category
//             </Typography>
//             <form onSubmit={handleSubmit} className="createCategoryContainer min-h-screen">
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="Category Name"
//                             name="name"
//                             value={categoryData.name}
//                             onChange={handleChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             id="outlined-multiline-static"
//                             label="Description"
//                             multiline
//                             name="description"
//                             rows={3}
//                             onChange={handleChange}
//                             value={categoryData.description}
//                         />
//                     </Grid>          
//                     <Grid item xs={12}>
//                         <Button variant="contained" sx={{ p: 1.8 }} size="large" type="submit">
//                             Add New Category
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Fragment>
//     );
// };

// export default CreateCategoryForm;
