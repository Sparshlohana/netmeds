// AdminPannel.jsx

import { ThemeProvider } from "@emotion/react";
import { Avatar, Box, Collapse } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { deepPurple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../Redux/Auth/Action";
import "./AdminPannel.css";
import AdminNavbar from "./Navigation/AdminNavbar";
import Dashboard from "./Views/Admin";
import { customTheme } from "./them/customeThem";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ComputerIcon from "@mui/icons-material/Computer";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArticleIcon from "@mui/icons-material/Article";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";

// Tables / Pages
import InvoicesSalesPage from "./Tables/Invoices/InvoicesSalesPage";
import Purchases from "./Tables/Invoices/Purchases";
import SalesReturns from "./Tables/Invoices/SalesReturns";
import PurchaseReturns from "./Tables/Invoices/PurchaseReturns";
import CustomerOrders from "./Tables/CustomerOrders";
import Orderbook from "./Tables/Orderbook";
import BusinessReports from "./Tables/BusinessReports";
import PatientFollowups from "./Tables/PatientFollowups";
import Expenses from "./Tables/Expenses";
import PaymentAccounts from "./Tables/CashAndBank/PaymentAccounts";
import ManageCheques from "./Tables/CashAndBank/ManageCheques";
import BranchTransfer from "./Tables/BranchTransfer";
import StockAudit from "./Tables/StockAudit";
import ControlCenter from "./Tables/ControlCenter";
import InstallOnDesktop from "./Tables/InstallOnDesktop";
import CreateCategory from "./Categories/CreateCategory.jsx";
import CategoriesAdmin from "./Categories/CategoriesAdmin.jsx";
import PromoCode from "./promo-code/PromoCode.jsx";
import Products from "./Tables/Products/Products.jsx";
import CreateProduct from "./Tables/Products/CreateProduct.jsx";
import Categories from "./Tables/Categories/Categories.jsx";
import AddCategories from "./Tables/Categories/AddCategories.jsx";

// 

const drawerWidth = 240;

const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  {
    name: "Products",
    icon: <InventoryIcon />,
    subheadings: [
      { name: "ProductsList", path: "/admin/products", icon: <InventoryIcon /> },
      { name: "Add Product", path: "/admin/product/create", icon: <AddBoxIcon /> },
    ],
  },
  {
    name: "Categories",
    icon: <InventoryIcon />,
    subheadings: [
      { name: "Categories", path: "/admin/category", icon: <InventoryIcon /> },
      { name: "Add Category", path: "/admin/category/create", icon: <AddBoxIcon /> },
    ],
  },
  {
    name: "Invoices",
    icon: <ReceiptIcon />,
    subheadings: [
      { name: "Sales", path: "/admin/invoices/sales", icon: <PointOfSaleIcon /> },
      { name: "Purchases", path: "/admin/invoices/purchases", icon: <LocalAtmIcon /> },
      { name: "Sales Returns", path: "/admin/invoices/sales-returns", icon: <KeyboardReturnIcon /> },
      { name: "Purchase Returns", path: "/admin/invoices/purchase-returns", icon: <MoneyOffIcon /> },
    ],
  },
  { name: "Customer Orders", path: "/admin/customer-orders", icon: <ShoppingCartIcon /> },
  { name: "Orderbook", path: "/admin/orderbook", icon: <BookIcon /> },
  { name: "Business Reports", path: "/admin/business-reports", icon: <ArticleIcon /> },
  { name: "Patient Followups", path: "/admin/patient-followups", icon: <PersonIcon /> },
  { name: "Expenses", path: "/admin/expenses", icon: <AttachMoneyIcon /> },
  {
    name: "Cash and Bank",
    icon: <AccountBalanceWalletIcon />,
    subheadings: [
      { name: "Payment Accounts", path: "/admin/cash-bank/payment-accounts", icon: <AccountBalanceIcon /> },
      { name: "Manage Cheques", path: "/admin/cash-bank/manage-cheques", icon: <ReceiptLongIcon /> },
    ],
  },
  { name: "Branch Transfer", path: "/admin/branch-transfer", icon: <CompareArrowsIcon /> },
  { name: "Stock Audit", path: "/admin/stock-audit", icon: <CheckCircleIcon /> },
  { name: "Control Center", path: "/admin/control-center", icon: <SettingsIcon /> },
  { name: "Install on Desktop", path: "/admin/install", icon: <ComputerIcon /> },
];

export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);

  // Track open/closed state for any parent with subheadings
  const [openMap, setOpenMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  // Auto-open the relevant parent group when landing on a child route
  useEffect(() => {
    const nextMap = {};
    menu.forEach((item) => {
      if (item.subheadings) {
        nextMap[item.name] = item.subheadings.some((s) => location.pathname.startsWith(s.path));
      }
    });
    setOpenMap((prev) => ({ ...prev, ...nextMap }));
  }, [location.pathname]);

  useEffect(() => {
    if (!isLargeScreen) {
      setSideBarVisible(false);
    }
  }, [location.pathname, isLargeScreen]);

  const handleToggleGroup = (name) => {
    setOpenMap((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  const drawer = useMemo(
    () => (
      <Box
        sx={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          paddingTop: isLargeScreen ? 0 : "64px",
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#000016" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "rgb(30, 41, 59)", borderRadius: "2px" },
        }}
      >
        {isLargeScreen && <Toolbar />}

        <Divider sx={{ my: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />

        <List sx={{ flexGrow: 1 }}>
          {menu.map((item) =>
            item.subheadings ? (
              <React.Fragment key={item.name}>
                <ListItemButton
                  onClick={() => handleToggleGroup(item.name)}
                  selected={item.subheadings.some((s) => location.pathname.startsWith(s.path))}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  {openMap[item.name] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={!!openMap[item.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subheadings.map((subItem) => (
                      <ListItemButton
                        key={subItem.name}
                        sx={{ pl: 4 }}
                        onClick={() => navigate(subItem.path)}
                        selected={location.pathname === subItem.path}
                        dense
                      >
                        <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)" }}>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={location.pathname === item.path}
                  dense
                >
                  <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>

        <List>
          <Divider />
          <ListItem onClick={handleLogout} disablePadding>
            <ListItemButton>
              <Avatar
                className="text-white"
                sx={{
                  bgcolor: deepPurple[500],
                  color: "white",
                  cursor: "pointer",
                  mr: 1.5,
                }}
              >
                {auth.user?.firstName?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <ListItemText className="ml-5" primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    ),
    [isLargeScreen, openMap, location.pathname, auth.user, navigate, handleLogout]
  );

  const handleSideBarViewInMobile = () => setSideBarVisible(true);
  const handleCloseSideBar = () => setSideBarVisible(false);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />

        <Drawer
          variant={drawerVariant}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#000016",
              color: "rgba(255,255,255,0.8)",
              ...(!isLargeScreen && {
                top: 0,
                [`&.MuiDrawer-paperAnchorLeft`]: {
                  position: "fixed",
                  height: "100%",
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                },
              }),
            },
          }}
        >
          {drawer}
        </Drawer>

        <Box className="adminContainer" component="main" sx={{ flexGrow: 1, p: 3, pt: 8, minHeight: "100vh" }}>
          <Toolbar />
          <Routes>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Products */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/create" element={<CreateProduct />} />

            {/* Categories */}
            <Route path="/category" element={<Categories />} />
            <Route path="/category/create" element={<AddCategories />} />

            {/* Invoices */}
            <Route path="/invoices/sales" element={<InvoicesSalesPage />} />
            <Route path="/invoices/purchases" element={<Purchases />} />
            <Route path="/invoices/sales-returns" element={<SalesReturns />} />
            <Route path="/invoices/purchase-returns" element={<PurchaseReturns />} />

            {/* Other menu items */}
            <Route path="/customer-orders" element={<CustomerOrders />} />
            <Route path="/orderbook" element={<Orderbook />} />
            <Route path="/business-reports" element={<BusinessReports />} />
            <Route path="/patient-followups" element={<PatientFollowups />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/cash-bank/payment-accounts" element={<PaymentAccounts />} />
            <Route path="/cash-bank/manage-cheques" element={<ManageCheques />} />
            <Route path="/branch-transfer" element={<BranchTransfer />} />
            <Route path="/stock-audit" element={<StockAudit />} />
            <Route path="/control-center" element={<ControlCenter />} />
            <Route path="/install" element={<InstallOnDesktop />} />

            {/* Extra pages you imported (paths unchanged) */}
            <Route path="/categories" element={<CategoriesAdmin />} />
            <Route path="/category/create" element={<CreateCategory />} />
            <Route path="/promo-code" element={<PromoCode />} />

            {/* Default & Fallback */}
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
