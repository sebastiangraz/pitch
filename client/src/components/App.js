/** @jsxImportSource theme-ui */

import * as componentList from "../slides";
import Slides from "./Slides";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Notes from "./Notes";
import { chromeColors } from "../theme";

const slides = [
  {
    notes: "Intro · Transforming Brand · Expectations",
    component: componentList.SlideIntro,
  },
  { notes: "Skills slide notes", component: componentList.SlideSkills },
  { notes: "Clients slide notes", component: componentList.SlideClients },
  {
    notes: "CaseCapchase slide notes",
    component: componentList.SlideCaseCapchase,
  },
  { notes: "CaseLoupe slide notes", component: componentList.SlideCaseLoupe },
  {
    notes: "CasePrototypingGuide slide notes",
    component: componentList.SlideCasePrototypingGuide,
  },
  { notes: "Process slide notes", component: componentList.SlideProcess },
  { notes: "Ethos slide notes", component: componentList.SlideEthos },
  {
    notes: "Exploration slide notes",
    component: componentList.SlideExploration,
  },
];

const isSafari =
  navigator.userAgent.indexOf("Safari") !== -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;

const showSlides = () => {
  if (window.location.pathname === "/") {
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
  }
};

const showNotes = (e) => {
  if (window.location.pathname === "/notes") {
    return <Notes />;
  }
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
        {showSlides()}
        {showNotes()}
      </div>
    </HelmetProvider>
  );
};

export default App;
