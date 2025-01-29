import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/components/App";
import { Theme, ThemeUIProvider } from "theme-ui";
import theme from "@/theme";
import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";
import Notes from "@/components/Notes";
import { AppWrapperContext } from "@/components/App";
import { SocketProvider } from "@/socket";

// Wrapper component to provide context
const NotesWithContext = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [room, setRoom] = React.useState("");
  const [isCreator, setIsCreator] = React.useState(false);

  // Get room from URL if present
  React.useEffect(() => {
    const roomFromQuery = searchParams.get("room") || "";
    console.log("NotesWithContext: Getting room from URL", { roomFromQuery });
    setRoom(roomFromQuery);
    setIsCreator(false);
  }, [searchParams]);

  // Function to update URL
  const updateUrl = React.useCallback(
    (newRoom: string) => {
      console.log("Updating URL with room:", newRoom);
      setSearchParams({ room: newRoom });
    },
    [setSearchParams]
  );

  return (
    <AppWrapperContext.Provider
      value={{ data: { room, isCreator }, updateUrl }}
    >
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
