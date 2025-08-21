import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HomePrescription = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-[#e8f5e9] p-8 md:p-16 rounded-lg shadow-lg space-y-8 md:space-y-0">
      {/* Left side: Upload Prescription */}
      <Box className="flex flex-col md:flex-row items-center space-x-8">
        <img
          src={'/path/to/prescription-image.jpg'} // Placeholder path
          alt="Upload Prescription"
          className="w-24 h-24 object-contain"
        />
        <Box className="text-center md:text-left">
          <Typography variant="h6" className="font-bold" sx={{ color: '#388E3C' }}>Need Medicine?</Typography>
          <Typography variant="h5" className="font-bold mb-2">Upload prescription</Typography>
          <Typography variant="body2" className="text-gray-600 mb-4 max-w-sm">
            Upload prescription and we will deliver your medicines
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#4CAF50', color: 'white', '&:hover': { bgcolor: '#388E3C' } }}>Upload Now</Button>
        </Box>
      </Box>
      
      {/* Right side: Doctor Consultation */}
      <Box className="flex flex-col md:flex-row items-center space-x-8 mt-8 md:mt-0">
        <Box className="text-center md:text-left">
          <Typography variant="h6" className="font-bold" sx={{ color: '#388E3C' }}>Need Medical Advice?</Typography>
          <Typography variant="h5" className="font-bold mb-2">Get consultation from <br /> our Doctors online.</Typography>
          <Button variant="contained" sx={{ bgcolor: '#4CAF50', color: 'white', '&:hover': { bgcolor: '#388E3C' } }}>Ask Now</Button>
        </Box>
        <img
          src={'/path/to/doctor-image.jpg'} // Placeholder path
          alt="Doctor"
          className="w-48 h-48 object-contain"
        />
      </Box>
    </div>
  );
};

export default HomePrescription;