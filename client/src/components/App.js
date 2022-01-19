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
    notes:
      "I've got a 10 slide presentation explaining briefly what I do, and what to expect if you were to collaborate together with me · I run a one man shop for all things branding · I help companies transform their brands into becoming more memorable, unique and at the end of the day; steer the brand towards a common business goal. ",
    component: componentList.SlideIntro,
  },
  {
    notes:
      "These are the hard skills you can expect to shape the final outcome · Design & Systems, design informs the system, system informs the design · Secondary & Tertiary",
    component: componentList.SlideSkills,
  },
  {
    notes:
      "Wide range of industries and product types · Helped me shape my branding skills",
    component: componentList.SlideClients,
  },
  {
    notes:
      "Contacted me after recent rebrand · Large sums of capital had to look trustworthy · Reposition brand as business partner",
    component: componentList.SlideCaseCapchase,
  },
  {
    notes:
      "Conference with a design audience · Balance brand to attract diverse crowd · Highly creative for shareability",
    component: componentList.SlideCaseLoupe,
  },
  {
    notes:
      "Design leaders excited about prototyping · Distributed via paid channels targeting specifically leaders in the design industry",
    component: componentList.SlideCasePrototypingGuide,
  },
  { notes: "4 distinct divisions", component: componentList.SlideProcess },
  {
    notes:
      "Few pointers on how I work · fixed SOW arent set in stone · Working directly with product owners · Frequent and involved updated yield better results · Do first ask questions later, iteration over perfection",
    component: componentList.SlideEthos,
  },
  {
    notes:
      "Design ethos · Explorations that don't follow the path of least resistance · A naive mindset can see beyond restrictions · Designs that answer the brief rather than following current trends",
    component: componentList.SlideExploration,
  },
  {
    notes: "Output",
    component: componentList.SlideOutput,
  },
  {
    notes:
      "Fixed has the benefit of capping your budget to better predict expenses, suitable for smaller to medium projects · Hourly is a great choice if the Scope of Work is flexible as a result the cost per hour is lower",
    component: componentList.SlidePricing,
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
  const [, setColorMode] = useColorMode();
  React.useEffect(() => {
    socket.on("updateMode", (e) => {
      setColorMode(e === "light" ? "dark" : "light");
    });
  }, [setColorMode]);

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
