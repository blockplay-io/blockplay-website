import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Create a theme instance for Material ui palette
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1d976c",
      light: "#56b794",
      dark: "#137a53",
    },
    secondary: {
      main: "#4fbff2",
      light: "#b2e3fa",
      dark: "#0aa3ed",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    background: {
      default: "#e5e5e5",
    },

    // Color mode selection: Dark or light
    type: "light",
  },
});

export default theme;
