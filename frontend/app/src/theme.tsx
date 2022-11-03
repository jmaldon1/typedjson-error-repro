import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#49585c",
    },
    secondary: {
      main: "#1b657e",
    },
    info: {
      main: "#022F40",
    },
    error: {
      main: "#FF6663",
    },
    warning: {
      main: "#FFCB47",
    },
    success: {
      main: "#0e8553",
    },
  },
});

export default theme;
