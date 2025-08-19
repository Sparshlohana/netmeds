// Admin/them/customeThem.js

import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

// This is the new theme for the lighter color scheme
const customerTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: green[600], // Dark green for primary actions
    },
    secondary: {
      main: "#f48fb1",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#ffdb0f",
    },
    background: {
      default: "#F5F5F5", // Light gray background
      paper: "#FFFFFF", // White for cards and surfaces
    },
    text: {
      primary: "#1A1A1A", // Black for main text
      secondary: "#424242", // Dark gray for secondary text
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: green[50], // Very light green for selected items
            "&:hover": {
              backgroundColor: green[100],
            },
          },
        },
      },
    },
  },
});

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9155FD",
    },
    secondary: {
      main: "#f48fb1",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#ffdb0f",
    },
    background: {
      default: "",
      paper: "rgb(0, 0, 22)",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9155FD",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export { customTheme, darkTheme, customerTheme };
