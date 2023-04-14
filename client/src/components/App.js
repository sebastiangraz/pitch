/** @jsxImportSource theme-ui */
import React from "react";
import { useColorMode, Button } from "theme-ui";
import * as componentList from "../slides";
import Slides from "./Slides";
import io from "socket.io-client";
import { settings } from "../settings";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Notes from "./Notes";
import { chromeColors } from "../theme";
import { motion } from "framer-motion";
import { alpha } from "@theme-ui/color";

export const slides = [
  {
    notes:
      "I've got a 10 slide presentation explaining briefly what I do, and what to expect if you were to collaborate together with me · I run a one man shop for all things branding, with emphasis on web · I help companies transform their brands into becoming more memorable, unique and at the end of the day; steer the brand towards a common business goal.",
    component: componentList.SlideIntro,
  },
  {
    notes:
      "These are the hard skills you can expect to shape the final outcome · Design & Systems, design informs the system, system informs the design · Secondary & Tertiary",
    component: componentList.SlideSkills,
    title: "Output",
  },
  {
    notes:
      "Wide range of industries and product types · Helped me shape my branding skills",
    component: componentList.SlideClients,
    title: "Associated Companies",
  },
  {
    notes:
      "Contacted me after recent rebrand · Large sums of capital had to look trustworthy · Reposition brand as business partner",
    component: componentList.SlideCaseCapchase,
    title: "Capchase",
  },
  {
    notes:
      "Conference with a design audience · Balance brand to attract diverse crowd · Highly creative for shareability",
    component: componentList.SlideCaseLoupe,
    title: "Loupe",
  },
  {
    notes:
      "Design leaders excited about prototyping · Distributed via paid channels targeting specifically leaders in the design industry",
    component: componentList.SlideCasePrototypingGuide,
    title: "Prototyping Guide",
  },
  {
    notes:
      "4 distinct divisions · Gather information · Define decisions · Design wide · Deliver consolidated",
    component: componentList.SlideProcess,
    title: "My Process",
  },
  {
    notes:
      "Few pointers on how I work · fixed SOW arent set in stone · Working directly with product owners · Frequent and involved updated yield better results · Do first ask questions later, iteration over perfection",
    component: componentList.SlideEthos,
    title: "Work Ethos",
  },
  // {
  //   notes:
  //     "Design ethos · Explorations that don't follow the path of least resistance · A naive mindset can see beyond restrictions · Designs that answer the brief rather than following current trends",
  //   component: componentList.SlideExploration,
  //   title: "Design Ethos",
  // },
  {
    notes: "Output",
    component: componentList.SlideOutput,
    title: "Brand Design Output",
  },
  {
    notes:
      "Fixed has the benefit of capping your budget to better predict expenses, suitable for smaller to medium projects · Hourly is a great choice if the Scope of Work is flexible as a result the cost per hour is lower",
    component: componentList.SlidePricing,
    title: "Price Considerations",
  },
];

const isSafari =
  navigator.userAgent.indexOf("Safari") !== -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;

const socket = io(
  settings.isLocal
    ? "ws://localhost:8080"
    : "https://brandserver.herokuapp.com",
  {
    transports: ["websocket"],
  }
);
const queryParams = new URLSearchParams(window.location.search);

const handleSubmit = (e, room) => {
  e.preventDefault();
  if (room !== "") {
    socket.emit("join_room", room);
    queryParams.set("room", room);
    window.history.replaceState(null, null, `?${queryParams}`);
  }
};

export const useAppWrapperContext = () => React.useContext(AppWrapperContext);
const AppWrapperContext = React.createContext(null);

const ShowSlides = () => {
  const [, setColorMode] = useColorMode();

  React.useEffect(() => {
    socket.on("updateMode", (e) => {
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

      {Object.entries(slides).map(([i]) => {
        return (
          <div
            style={{
              height: "100vh",
              width: "100vw",
            }}
            sx={{
              scrollSnapAlign: ["none", "start"],
            }}
            className="ghostSlide"
            key={i}
          />
        );
      })}
    </>
  );
};

const App = () => {
  const [room, setRoom] = React.useState("");
  React.useEffect(() => {
    setRoom(queryParams.get("room"));
  }, []);
  return (
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
            sx={{
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
                      isSafari
                        ? chromeColors.safari.dark
                        : chromeColors.chrome.dark,
                      0.4
                    )(t)}`,
                },
              },
            }}
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
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
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
              />
              <Button
                sx={{
                  flex: 0.2,
                  height: "80px",
                  borderRadius: "27.5px",
                  fontSize: "20px",
                }}
                type="submit"
                // onClick={joinRoom}
              >
                Join
              </Button>
            </form>
          </motion.div>
        </div>
        {window.location.pathname === "/notes" && <Notes />}
        {window.location.pathname === "/" && (
          <AppWrapperContext.Provider value={{ data: { room: room } }}>
            <ShowSlides />
          </AppWrapperContext.Provider>
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
