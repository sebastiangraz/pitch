import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/components/App";
import { Theme, ThemeUIProvider } from "theme-ui";
import theme from "@/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "@/components/Notes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeUIProvider theme={theme as Theme<{}>}>
      <RouterProvider router={router} />
    </ThemeUIProvider>
  </React.StrictMode>
);
