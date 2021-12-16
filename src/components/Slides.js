import React from "react";
import Slide from "./Slide";

const Slides = React.memo(({ children }) => {
  const ref = React.useRef();

  const [position, setPosition] = React.useState([]);
  const [height, setHeight] = React.useState([]);

  React.useLayoutEffect(() => {
    let arr = [];
    let childPosition = [];
    const child = ref.current.children;

    [...child].forEach((e) => {
      arr.push(e.getBoundingClientRect().height);
    });

    arr.reduce((acc, child) => {
      childPosition.push(acc + child);
      return acc + child;
    }, 0);

    setPosition(childPosition);
    setHeight(arr);
  }, []);

  return (
    <div ref={ref}>
      {React.Children.map(children || null, (child, i) => {
        return (
          <Slide index={i} childPosition={position} childHeight={height}>
            {child}
          </Slide>
        );
      })}
    </div>
  );
});
export default Slides;
