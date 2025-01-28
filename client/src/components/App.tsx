/** @jsxImportSource theme-ui */
import React from "react";
import { useColorMode, Button, ThemeUIStyleObject } from "theme-ui";
import * as componentList from "@/slides";
import Slides from "@/components/Slides";
import io from "socket.io-client";
import { settings } from "@/settings";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { chromeColors } from "@/theme";
import { motion } from "framer-motion";
import { alpha } from "@theme-ui/color";

interface Slide {
  notes: string;
  component: React.ComponentType<{ notes?: string; title?: string }>;
  title?: string;
}

export const slides: Slide[] = [
  {
    notes: "I've got a 10 slide presentation...",
    component: componentList.SlideIntro,
  },
  // ... rest of your slides array
];

const isSafari: boolean =
  navigator.userAgent.indexOf("Safari") !== -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;

const socket = io(
  settings.isLocal ? "ws://localhost:8080" : "https://pitch-f7gm.onrender.com",
  {
    transports: ["websocket"],
  }
);

const queryParams = new URLSearchParams(window.location.search);

const handleSubmit = (e: React.FormEvent, room: string): void => {
  e.preventDefault();
  if (room !== "") {
    socket.emit("join_room", room);
    queryParams.set("room", room);
    window.history.replaceState({}, "", `?${queryParams}`);
  }
};

interface AppContextData {
  data: {
    room: string;
  };
}

type AppContextType = AppContextData | null;
export const AppWrapperContext = React.createContext<AppContextType>(null);
export const useAppWrapperContext = () => {
  const context = React.useContext(AppWrapperContext);
  if (!context) throw new Error("Must be used within AppWrapperContext");
  return context;
};

const ShowSlides = () => {
  const [, setColorMode] = useColorMode();

  React.useEffect(() => {
    socket.on("updateMode", (e: { mode: string }) => {
      setColorMode(e.mode === "light" ? "dark" : "light");
    });
  }, [setColorMode]);

  return (
    <>
      <Slides>
        {Object.entries(slides).map(([i, v]) => {
          const Slide = v.component;
          return <Slide key={i} notes={v.notes} title={v.title} />;
        })}
      </Slides>

      {Object.entries(slides).map(([i]) => (
        <div
          key={i}
          style={{
            height: "100vh",
            width: "100vw",
          }}
          sx={{
            scrollSnapAlign: ["none", "start"],
          }}
          className="ghostSlide"
        />
      ))}
    </>
  );
};

const App = () => {
  const [room, setRoom] = React.useState("");

  React.useEffect(() => {
    setRoom(queryParams.get("room") || "");
  }, []);

  const motionStyles: ThemeUIStyleObject = {
    width: "calc(100% - 15px)",
    left: "10px",
    top: "-90px",
    height: "110px",
    position: "absolute",
    display: "flex",
    alignItems: "start",
    gap: "5px",
    flexDirection: "row",
    "&:hover": {
      "& > input": {
        boxShadow: (t) =>
          `0 20px 20px -2px ${alpha(
            isSafari ? chromeColors.safari.dark : chromeColors.chrome.dark,
            0.4
          )(t)}`,
      },
    },
  };

  return (
    <AppWrapperContext.Provider value={{ data: { room } }}>
      <HelmetProvider>
        <div className="App">
          <Helmet>
            <meta
              name="theme-color"
              content={
                isSafari ? chromeColors.safari.light : chromeColors.chrome.light
              }
              media="(prefers-color-scheme: light)"
            />
            <meta
              name="theme-color"
              content={
                isSafari ? chromeColors.safari.dark : chromeColors.chrome.dark
              }
              media="(prefers-color-scheme: dark)"
            />
          </Helmet>
          <div
            sx={{
              position: "fixed",
              zIndex: 100,
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <motion.div
              sx={motionStyles}
              drag="y"
              dragConstraints={{
                top: 0,
                bottom: 100,
              }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              dragElastic={0.5}
              whileTap={{ cursor: "grabbing" }}
            >
              <form
                onSubmit={(e) => handleSubmit(e, room)}
                sx={{ display: "contents" }}
              >
                <input
                  onChange={(e) => setRoom(e.target.value)}
                  sx={{
                    all: "unset",
                    transition: "box-shadow 0.3s ease",
                    flex: 1,
                    height: "80px",
                    boxSizing: "border-box",
                    fontSize: "20px",
                    borderRadius: "27.5px",
                    padding: "0.5rem 1rem",
                    color: "bg",
                    bg: isSafari
                      ? chromeColors.safari.dark
                      : chromeColors.chrome.dark,
                  }}
                  placeholder="Room"
                  value={room}
                />
                <Button
                  sx={{
                    flex: 0.2,
                    height: "80px",
                    borderRadius: "27.5px",
                    fontSize: "20px",
                  }}
                  type="submit"
                >
                  Join
                </Button>
              </form>
            </motion.div>
          </div>
          <ShowSlides />
        </div>
      </HelmetProvider>
    </AppWrapperContext.Provider>
  );
};

export default App;
