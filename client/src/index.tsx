import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/components/App";
import { Theme, ThemeUIProvider } from "theme-ui";
import theme from "@/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "@/components/Notes";
import { AppWrapperContext } from "@/components/App";
import { SocketProvider } from "@/socket";

// Wrapper component to provide context
const NotesWithContext = () => {
  const [room, setRoom] = React.useState("");
  const [isCreator, setIsCreator] = React.useState(false);

  // Get room from URL if present
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomFromQuery = params.get("room") || "";
    setRoom(roomFromQuery);
    setIsCreator(false);
  }, []);

  return (
    <AppWrapperContext.Provider value={{ data: { room, isCreator } }}>
      <Notes />
    </AppWrapperContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/notes",
    element: <NotesWithContext />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeUIProvider theme={theme as Theme<{}>}>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </ThemeUIProvider>
  </React.StrictMode>
);
