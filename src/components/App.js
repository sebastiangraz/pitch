import React from "react";
import * as componentList from "./SlideIndex";
import Slides from "./Slides";
const App = () => {
  return (
    <div className="App">
      <Slides>
        {Object.entries(componentList).map(([i, Slide]) => {
          return <Slide dataTest={"test"} key={i} />;
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
  );
};

export default App;
