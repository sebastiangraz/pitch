/** @jsxImportSource theme-ui */
import React from "react";
import { useColorMode } from "theme-ui";
import * as componentList from "../slides";
import Slides from "./Slides";
import io from "socket.io-client";
import { settings } from "../settings";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Notes from "./Notes";
import { chromeColors } from "../theme";

export const slides = [
  {
    notes: "Process · Expectations · Transforming Brand ",
    component: componentList.SlideIntro,
  },
  {
    notes: "Hard skills · Design & Systems go together",
    component: componentList.SlideSkills,
  },
  {
    notes:
      "Wide range of industries · Wide range of capacities · Helped me shape my branding skills",
    component: componentList.SlideClients,
  },
  {
    notes:
      "Contacted me after recent rebrand · Large sums of capital had to look trustworthy · Reposition brand as business partner",
    component: componentList.SlideCaseCapchase,
  },
  {
    notes:
      "Conference with design audience · Balance brand to attract diverse crowd · Highly creative for shareability",
    component: componentList.SlideCaseLoupe,
  },
  {
    notes:
      "Design leaders excited about prototyping · Distributed via paid channels",
    component: componentList.SlideCasePrototypingGuide,
  },
  { notes: "4 distinct divisions", component: componentList.SlideProcess },
  {
    notes:
      "fixed SOW arent set in stone · Working directly with product owners · Frequent and involved updated yield better results · Do first ask questions later, refine from feedback rather than perfect",
    component: componentList.SlideEthos,
  },
  {
    notes:
      "Design ethos · Explorations that don't follow the path of least resistance · A naive mindset can see beyond restrictions · Designs that answer the brief rather than following current trends",
    component: componentList.SlideExploration,
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

const ShowSlides = () => {
  const [colorMode, setColorMode] = useColorMode();
  React.useEffect(() => {
    socket.on("updateMode", (e) => {
      setColorMode(e === "default" ? "dark" : "default");
    });
  }, [setColorMode]);
  console.log(colorMode);
  return (
    <>
      <Slides>
        {Object.entries(slides).map(([i, v]) => {
          const Slide = v.component;
          return <Slide key={i} notes={v.notes} />;
        })}
      </Slides>
      {Object.entries(slides).map(([i]) => {
        return (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              scrollSnapAlign: "start",
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

        {window.location.pathname === "/notes" && <Notes />}
        {window.location.pathname === "/" && <ShowSlides />}
      </div>
    </HelmetProvider>
  );
};

export default App;
