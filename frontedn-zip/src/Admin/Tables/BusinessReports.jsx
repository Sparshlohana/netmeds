// tables/BusinessReports.jsx

import React, { useState } from 'react';
import { Box, Card, Typography, Tab, Tabs, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { green } from '@mui/material/colors';


const reportData = [
  {
    name: 'Sales Register',
    viewBy: 'View by Invoice-wise and Date-wise',
    description: 'Simplify your sales tracking and analysis, includes get and non-get invoices with profit and...',
  },
  {
    name: 'Sale & Return Product-Level Detail',
    viewBy: 'View by Returns and Sales',
    description: 'Effortlessly manage product-level details with Sale & Return',
  },
  {
    name: 'Sales Summary',
    viewBy: 'View by Product, Company, Customer, Supplier, Business User-Wise',
    description: 'Get comprehensive details on product sales, returns, stock, including GST and non-GST tra...',
  },
  {
    name: 'Sales Register (Doctor-Wise)',
    viewBy: 'View by Invoice-wise and Date-wise',
    description: 'Effortlessly manage doctor wise sales, includes customer details, revenue, profits',
  },
  {
    name: 'Scheduled Drug Register',
    viewBy: 'View by Drug schedules',
    description: 'Empowering efficient drug-schedule wise management, gives details for all drug schedule...',
  },
  {
    name: 'Sales Register (Party-Wise)',
    viewBy: 'View by Sales and Parties',
    description: 'Get comprehensive details on product sales for Parties',
  },
  {
    name: 'Delivery Challans Register',
    viewBy: 'View by Invoice-wise and Date-wise',
    description: 'Simplify your sales tracking and analysis',
  },
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StyledCard = styled(Card)({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #E0E0E0',
});

const ReportListItem = styled(ListItem)({
  borderBottom: '1px solid #E0E0E0',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const BusinessReports = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)', color: 'black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'darkgreen' }}>Business Reports</Typography>
        <Button sx={{ color: green[600], textTransform: 'none', '&:hover': { backgroundColor: green[100] } }}>
          <InfoOutlinedIcon sx={{ mr: 0.5 }} /> How to View Reports?
        </Button>
      </Box>
      <Typography variant="body2" sx={{ color: '#444', mb: 3 }}>
        View & Download Reports in CSV, PDF or XLS
      </Typography>

      <StyledCard>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            borderBottom: '1px solid #E0E0E0',
            '& .MuiTab-root': { color: '#616161', fontWeight: 'bold' },
            '& .Mui-selected': { color: green[600] + ' !important' },
          }}
        >
          <Tab label="SALES REPORTS" />
          <Tab label="STOCK REPORTS" />
          <Tab label="PURCHASE REPORTS" />
          <Tab label="PAYMENTS REPORTS" />
          <Tab label="GST REPORTS" />
          <Tab label="PARTY REPORTS" />
          <Tab label="ORDER REPORTS" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'darkgreen', fontWeight: 'bold' }}>
              REPORT NAME / VIEW BY
            </Typography>
            <Typography variant="body1" sx={{ color: 'darkgreen', fontWeight: 'bold' }}>
              REPORT DESCRIPTION
            </Typography>
          </Box>
          <List>
            {reportData.map((report, index) => (
              <ReportListItem key={index} sx={{ py: 2 }}>
                <IconButton sx={{ color: '#444', mr: 2, '&:hover': { backgroundColor: green[50] } }}>
                  <StarBorderIcon />
                </IconButton>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}>{report.name}</Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#616161' }}>{report.viewBy}</Typography>
                  }
                />
                <ListItemText
                  sx={{ textAlign: 'right' }}
                  primary={
                    <Typography variant="body2" sx={{ color: '#616161', fontStyle: 'italic' }}>
                      {report.description}
                    </Typography>
                  }
                />
                <IconButton edge="end" sx={{ color: '#444', ml: 2, '&:hover': { backgroundColor: green[50] } }}>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </ReportListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography sx={{ color: '#616161' }}>Stock Reports content will go here...</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Typography sx={{ color: '#616161' }}>Purchase Reports content will go here...</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <Typography sx={{ color: '#616161' }}>Payments Reports content will go here...</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <Typography sx={{ color: '#616161' }}>GST Reports content will go here...</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={5}>
          <Typography sx={{ color: '#616161' }}>Party Reports content will go here...</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={6}>
          <Typography sx={{ color: '#616161' }}>Order Reports content will go here...</Typography>
        </TabPanel>

      </StyledCard>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', color: '#616161' }}>
          Move Up or Down - Arrow Keys | To Open a Report - Enter | Go Front (Ctrl+Right) - Go Back (Ctrl+Left)
        </Typography>
      </Box>
    </Box>
  );
};

export default BusinessReports;