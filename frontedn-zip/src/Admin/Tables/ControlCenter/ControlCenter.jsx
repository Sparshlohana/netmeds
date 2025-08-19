// tables/ControlCenter/BusinessProfile.jsx

import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, TextField, Button, Grid, styled } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
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

const ControlCenter = () => {
   const [businessData, setBusinessData] = useState({
      businessName: 'SANJEEVNI MEDIMALL',
      dlForm20: '',
      dlForm21: '',
      fssaiLicenseNo: '',
      mpid: '',
      businessGstin: '0/28',
      businessAddress1: 'Kachchh, Gujarat - 370201',
      businessAddress2: '',
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setBusinessData(prev => ({ ...prev, [name]: value }));
   };

   const handleSave = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
         console.log('Saving Business Profile:', businessData);
         alert('Business Profile saved successfully! (Simulated)');
         setLoading(false);
      }, 1000);
   };

   return (
      <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>
               Business Profile
            </Typography>
            <ActionButton startIcon={<SaveIcon />} onClick={handleSave} disabled={loading} sx={{ backgroundColor: green[600], '&:hover': { backgroundColor: green[700] } }}>
               {loading ? 'Saving...' : 'Save (F2)'}
            </ActionButton>
         </Box>
         <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>
            View or update the details below
         </Typography>

         <Card sx={{ backgroundColor: '#FFFFFF', p: 3, borderRadius: '8px', boxShadow: 'none', border: '1px solid #E0E0E0' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'darkgreen' }}>BUSINESS</Typography>
            <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="BUSINESS NAME*"
                     name="businessName"
                     value={businessData.businessName}
                     onChange={handleChange}
                     required
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="DL FORM-20"
                     name="dlForm20"
                     value={businessData.dlForm20}
                     onChange={handleChange}
                     placeholder="Optional"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="DL FORM-21"
                     name="dlForm21"
                     value={businessData.dlForm21}
                     onChange={handleChange}
                     placeholder="Optional"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="FSSAI LICENSE NO."
                     name="fssaiLicenseNo"
                     value={businessData.fssaiLicenseNo}
                     onChange={handleChange}
                     placeholder="0/14"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="MPID"
                     name="mpid"
                     value={businessData.mpid}
                     onChange={handleChange}
                     placeholder="0/12"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="BUSINESS GSTIN"
                     name="businessGstin"
                     value={businessData.businessGstin}
                     onChange={handleChange}
                     placeholder="0/28"
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="BUSINESS ADDRESS LINE 1"
                     name="businessAddress1"
                     value={businessData.businessAddress1}
                     onChange={handleChange}
                     required
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <StyledTextField
                     fullWidth
                     label="BUSINESS ADDRESS LINE 2"
                     name="businessAddress2"
                     value={businessData.businessAddress2}
                     onChange={handleChange}
                     placeholder="Optional"
                  />
               </Grid>
            </Grid>
         </Card>
      </Box>
   );
};

export default ControlCenter;