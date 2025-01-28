import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/components/App";
import { Theme, ThemeUIProvider } from "theme-ui";
import theme from "@/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeUIProvider theme={theme as Theme<{}>}>
      <App />
    </ThemeUIProvider>
  </React.StrictMode>
);
