// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getPromoCodes, createPromoCode, deletePromoCode } from "../../Redux/Customers/promo-codes/Action";

// const PromoCodesTable = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { promoCodes } = useSelector((store) => store);

//   const [filterValue, setFilterValue] = useState({ availability: "", sort: "" });
//   const [newPromoCode, setNewPromoCode] = useState({
//     code: "",
//     discountValue: "",
//     discountType: "percentage", // Default discount type
//     expirationDate: "",
//     usageLimit: 1, // Default usage limit
//     isActive: true,
//   });

//   useEffect(() => {
//     dispatch(getPromoCodes());
//   }, [dispatch]);

//   const handleCreatePromoCode = async () => {
//     await dispatch(createPromoCode(newPromoCode))

//     setNewPromoCode({
//       code: "",
//       discountValue: "",
//       discountType: "percentage",
//       expirationDate: "",
//       usageLimit: 1,
//       isActive: true,
//     });
//     await dispatch(getPromoCodes());
//   };

//   const handleDeletePromoCode = async (id) => {
//     await dispatch(deletePromoCode(id));
//     await dispatch(getPromoCodes());
//   };


//   return (
//     <Box width={"100%"}>
//       <Card className="p-3">
//         <CardHeader title="Create New Promo Code" />
//         <Grid container spacing={2}>
//           {/* Form for creating a new promo code */}
//           <Grid item xs={3}>
//             <TextField
//               label="Code"
//               value={newPromoCode.code}
//               onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e.target.value })}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="Discount Value"
//               type="number"
//               value={newPromoCode.discountValue}
//               onChange={(e) => setNewPromoCode({ ...newPromoCode, discountValue: e.target.value })}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <FormControl fullWidth>
//               <InputLabel id="discount-type-label">Discount Type</InputLabel>
//               <Select
//                 labelId="discount-type-label"
//                 value={newPromoCode.discountType}
//                 onChange={(e) => setNewPromoCode({ ...newPromoCode, discountType: e.target.value })}
//               >
//                 <MenuItem value="percentage">Percentage</MenuItem>
//                 <MenuItem value="fixed">Fixed</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="Usage Limit"
//               type="number"
//               value={newPromoCode.usageLimit}
//               onChange={(e) => setNewPromoCode({ ...newPromoCode, usageLimit: e.target.value })}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="Expiration Date"
//               type="date"
//               value={newPromoCode.expirationDate}
//               onChange={(e) => setNewPromoCode({ ...newPromoCode, expirationDate: e.target.value })}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <FormControl fullWidth>
//               <InputLabel id="active-label">Active</InputLabel>
//               <Select
//                 labelId="active-label"
//                 value={newPromoCode.isActive ? "true" : "false"}
//                 onChange={(e) => setNewPromoCode({ ...newPromoCode, isActive: e.target.value === "true" })}
//               >
//                 <MenuItem value={"true"}>Yes</MenuItem>
//                 <MenuItem value={"false"}>No</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" onClick={handleCreatePromoCode}>
//               Create Promo Code
//             </Button>
//           </Grid>
//         </Grid>
//       </Card>

//       <Card className="mt-2">
//         <CardHeader title="All Promo Codes" />
//         <TableContainer>
//           <Table aria-label="promo-code-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Code</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Discount</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Discount Type</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Usage Limit</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Expiry Date</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Availability</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {promoCodes?.promoCodes?.map((promoCode) => (
//                 <TableRow hover key={promoCode._id}>
//                   <TableCell>{promoCode.code}</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>
//                     {promoCode.discountType === "percentage"
//                       ? `${promoCode.discountValue}%`
//                       : `₹${promoCode.discountValue}`}
//                   </TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>{promoCode.discountType}</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>{promoCode.usageLimit}</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>
//                     {new Date(promoCode.expirationDate).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>{promoCode.isActive ? "Active" : "Expired"}</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>
//                     <Button variant="text" onClick={() => handleDeletePromoCode(promoCode._id)}>
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>

//           </Table>
//         </TableContainer>
//       </Card>
//     </Box>
//   );
// };

// export default PromoCodesTable;
