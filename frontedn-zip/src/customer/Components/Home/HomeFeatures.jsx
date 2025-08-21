import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const features = [
  {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 40, color: '#388E3C' }} />,
    title: 'Reliable',
    description: 'All Products are 100% genuine and reliable',
  },
  {
    icon: <LockOpenIcon sx={{ fontSize: 40, color: '#388E3C' }} />,
    title: 'Secure',
    description: '128-bit SSL encryption to provide user a safe shopping experience.',
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#388E3C' }} />,
    title: 'Affordable',
    description: 'Maximum discount and offers on products and services.',
  },
];

const HomeFeatures = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center py-10 space-y-8 md:space-y-0 md:space-x-8 px-4">
      {features.map((feature, index) => (
        <Box key={index} className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center">
            {feature.icon}
          </div>
          <Typography variant="h6" className="font-bold mt-4" sx={{ color: '#388E3C' }}>{feature.title}</Typography>
          <Typography variant="body2" className="text-gray-600 mt-2 max-w-xs">{feature.description}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default HomeFeatures;