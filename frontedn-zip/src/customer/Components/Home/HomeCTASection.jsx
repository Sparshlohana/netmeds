import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HomeCTASection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 px-4 py-16">
      {/* Pamper Yourself Banner */}
      <Box
        className="w-full md:w-1/2 p-8 rounded-lg shadow-lg"
        sx={{
          backgroundImage: `url(${'../assets/images/cta1.jpg'})`, // Placeholder path, replace with your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          minHeight: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h4" className="font-bold mb-2">PAMPER YOURSELF</Typography>
        <Typography variant="body1" className="mb-4">With Premium Skin & Hair Care Range</Typography>
        <Button variant="contained" sx={{ bgcolor: 'white', color: '#388E3C', '&:hover': { bgcolor: 'white' } }}>Shop Now</Button>
      </Box>

      {/* Right side banners */}
      <Box className="w-full md:w-1/2 flex flex-col space-y-8">
        {/* Top Banner */}
        <Box
          className="w-full p-8 rounded-lg shadow-lg"
          sx={{
            backgroundImage: `url(${'../assets/images/cta2.jpg'})`, // Placeholder path, replace with your image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            minHeight: 140,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h6" className="font-bold mb-2">Best Care for You and Your Lit One</Typography>
          <Button variant="contained" sx={{ bgcolor: 'white', color: '#388E3C', '&:hover': { bgcolor: 'white' } }}>Order Now</Button>
        </Box>
        {/* Bottom Banner */}
        <Box
          className="w-full p-8 rounded-lg shadow-lg"
          sx={{
            backgroundImage: `url(${'../assets/images/cta3.jpg'})`, // Placeholder path, replace with your image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            minHeight: 140,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h6" className="font-bold mb-2">Up To 30% SAVINGS on medicine orders</Typography>
          <Button variant="contained" sx={{ bgcolor: 'white', color: '#388E3C', '&:hover': { bgcolor: 'white' } }}>Order Now</Button>
        </Box>
      </Box>
    </div>
  );
};

export default HomeCTASection;