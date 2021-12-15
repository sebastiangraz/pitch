import React from "react";
import * as componentList from "./SlideIndex";
import Slides from "./Slides";
const App = () => {
  return (
    <div className="App">
      <Slides>
        {Object.entries(componentList).map(([i, Section]) => {
          return <Section key={i} />;
        })}
      </Slides>
    </div>
  );
};

export default App;
