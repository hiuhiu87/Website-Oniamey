import { createTheme } from "react-data-table-component";

const TableTheme = createTheme("solarized", {
  text: {
    primary: "#000000",
    secondary: "#000000",
  },
  background: {
    default: "#ffffff",
  },
  context: {
    background: "#ffffff",
    text: "#000000",
  },
  divider: {
    default: "#ffffff",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

export default TableTheme;
