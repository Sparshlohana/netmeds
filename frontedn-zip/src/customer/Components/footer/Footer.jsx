import React from 'react';
import { Grid, Typography, Link, IconButton, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: '#e8f5e9', // Light green background
        color: '#333',
        p: 5,
        borderTop: '1px solid #e0e0e0'
      }}
    >
      {/* Footer Top Section */}
      <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 4, md: 0 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <img
            src="/images/medicines-10.png"
            alt="MEDICAL"
            style={{ width: '150px', marginBottom: '10px' }}
          />
          <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            685 Market Street
            <br />
            San Francisco, CA 94105,
            <br />
            United States
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton sx={{ color: '#4CAF50' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: '#4CAF50' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: '#4CAF50' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: '#4CAF50' }}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      {/* Company Links */}
      <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 4, md: 0 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: '#388E3C' }}>
          Company
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>About</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>All Products</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Contact Us</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>FAQs</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Site Map</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Terms & Conditions</Link>
        </Typography>
      </Grid>

      {/* Customer Service Links */}
      <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 4, md: 0 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: '#388E3C' }}>
          Customer Service
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Delivery Information</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Returns Policy</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Privacy Policy</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Cookie Policy</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Secure Shopping</Link>
        </Typography>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 4, md: 0 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: '#388E3C' }}>
          Quick Links
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Pharmacy & Health</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Prescriptions</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Beauty</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Mother & Baby</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Fragrance</Link>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Link href="#" color="inherit" underline="hover" sx={{ color: '#2E7D32' }}>Toiletries</Link>
        </Typography>
      </Grid>

      {/* Footer Bottom Section */}
      <Grid
        item
        xs={12}
        sx={{
          mt: 1,
          pt: 1,
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          color: '#757575' // Slightly lighter text for the bottom part
        }}
      >
        <Typography variant="body2" component="p">
          © 2022 - E-commerce by Kryptonyte
        </Typography>
        <Box sx={{ mt: { xs: 2, sm: 0 }, '& img': { height: '24px', ml: 1 }, display: 'flex', justifyContent: 'center'   }}>
          <img src="https://example.com/visa.svg" alt="Visa" />
          <img src="https://example.com/mastercard.svg" alt="Mastercard" />
          <img src="https://example.com/discover.svg" alt="Discover" />
          <img src="https://example.com/amex.svg" alt="Amex" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;