import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Auth/Action';
import { useEffect, useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Custom styled components for the layout
const RoleChip = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 10px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.12)',
  fontSize: 12,
  fontWeight: 700,
  color: '#fff',
}));

const RoundIconButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255,255,255,0.1)',
  borderRadius: 999,
  width: 40,
  height: 40,
  marginLeft: 8,
  color: '#fff',
  '&:hover': { background: 'rgba(255,255,255,0.18)' },
}));

const UserInitialsButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255,255,255,0.2)',
  borderRadius: 999,
  width: 40,
  height: 40,
  marginLeft: 8,
  color: '#fff',
  fontWeight: 800,
  '&:hover': { background: 'rgba(255,255,255,0.3)' },
}));

export default function AdminNavbar({ handleSideBarViewInMobile }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [tab, setTab] = useState('Stock');

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (!jwt || auth.user?.role !== 'ADMIN') {
      // You should handle the redirection based on your app's logic
    }
  }, [jwt, auth, navigate]);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleTabChange = (_e, value) => {
    setTab(value);
    // Add navigation logic for tabs here
    // Example: navigate('/' + value.toLowerCase());
  };

  // Profile menu for desktop
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 1 }}>My Account</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ExitToAppIcon />
          <Typography sx={{ ml: 1 }}>Logout</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );

  // Mobile menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <RoundIconButton size="large" color="inherit">
          <SearchIcon />
        </RoundIconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem>
        <RoundIconButton size="large" color="inherit">
          <SupportAgentIcon />
        </RoundIconButton>
        <p>Support</p>
      </MenuItem>
      <MenuItem>
        <RoundIconButton size="large" color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </RoundIconButton>
        <p>Alerts</p>
      </MenuItem>
      <MenuItem>
        <RoundIconButton size="large" color="inherit">
          <KeyboardIcon />
        </RoundIconButton>
        <p>Shortcut</p>
      </MenuItem>
      {/* Add "Get Online Orders" to mobile menu if needed */}
      <MenuItem>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            px: 2,
            background: 'linear-gradient(90deg, rgba(236,72,153,1) 0%, rgba(168,85,247,1) 100%)',
            width: '100%', // Make it full width in mobile menu
          }}
          onClick={() => { console.log('Get Online Orders Mobile'); handleMobileMenuClose(); }}
        >
          Get Online Orders
        </Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <RoundIconButton size="large" color="inherit" aria-controls="primary-search-account-menu" aria-haspopup="true">
          <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
            {(auth.user?.firstName?.[0] || 'T').toUpperCase() + (auth.user?.lastName?.[0] || 'E').toUpperCase()}
          </Typography>
        </RoundIconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          backgroundColor: 'rgb(0, 0, 22)',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        }}
      >
        <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
          {/* Left: Logo and Store Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isLargeScreen && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleSideBarViewInMobile}
              >
                <MenuIcon />
              </IconButton>
            )}
            {/* Localwell Logo */}
            <img 
              src="/images/zedicines-10.png" 
              alt="Localwell Logo" 
              style={{ 
                maxHeight: 40, // Responsive height
                maxWidth: 45, // Responsive width
                marginRight: 8, 
                objectFit: 'contain' 
              }} 
            />
            {/* User/Store Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 700, lineHeight: 1.2, ml: 1.5 }}>
                  SANJEEVNI MEDIMALL
                </Typography>
                <Typography sx={{ fontSize: { xs: 10, sm: 12 }, opacity: 0.8, lineHeight: 1.2, ml: 1.5 }}>
                  Kachchh, Gujarat - 370201
                </Typography>
              </Box>
              {isLargeScreen && <KeyboardArrowDownIcon sx={{ ml: 0.5, opacity: 0.9, cursor: 'pointer' }} />}
            </Box>
          </Box>

          {/* Center: Tabs (currently commented out as per previous code) */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: '#f06292', height: 3 } }}
              sx={{
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minWidth: 80, color: 'rgba(255,255,255,0.7)' },
                '& .Mui-selected': { color: '#f48fb1 !important' },
              }}
            >
              <Tab value="Purchases" label="Purchases" />
              <Tab value="Stock" label="Stock" />
              <Tab value="Sales" label="Sales" />
            </Tabs>
          </Box> */}

          {/* Right: Buttons and User */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}> {/* Hide on xs, sm */}
            {/* Get Online Orders Button */}
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                px: 2,
                background:
                  'linear-gradient(90deg, rgba(236,72,153,1) 0%, rgba(168,85,247,1) 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, rgba(236,72,153,0.9) 0%, rgba(168,85,247,0.9) 100%)',
                },
              }}
              onClick={() => { /* logic for online orders */ }}
            >
              Get Online Orders
            </Button>

            {/* Round Icon Buttons */}
            <RoundIconButton aria-label="search">
              <SearchIcon />
            </RoundIconButton>
            <RoundIconButton aria-label="support">
              <SupportAgentIcon />
            </RoundIconButton>
            <RoundIconButton aria-label="alerts">
              <Badge badgeContent={3} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </RoundIconButton>
            <RoundIconButton aria-label="shortcut">
              <KeyboardIcon />
            </RoundIconButton>
            <UserInitialsButton
              aria-label="user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                {(auth.user?.firstName?.[0] || 'T').toUpperCase() + (auth.user?.lastName?.[0] || 'E').toUpperCase()}
              </Typography>
            </UserInitialsButton>
          </Box>

          {/* Mobile overflow menu button (visible on xs, sm) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}