/** @jsxImportSource theme-ui */

import * as componentList from "./SlideIndex";
import Slides from "./Slides";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { chromeColors } from "../theme";

const isSafari =
  navigator.userAgent.indexOf("Safari") !== -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;

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
        <Slides>
          {Object.entries(componentList).map(([i, Slide]) => {
            return <Slide key={i} />;
          })}
        </Slides>
        {Object.entries(componentList).map(([i]) => {
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
      </div>
    </HelmetProvider>
  );
};

export default App;
