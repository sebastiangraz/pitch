import React from "react";
import { useViewportScroll } from "framer-motion";
import Slide from "./Slide";

const Slides = React.memo(({ children }) => {
  const ref = React.useRef();
  const { scrollY } = useViewportScroll();
  const [position, setPosition] = React.useState([]);
  const [height, setHeight] = React.useState([]);
  const [totalHeight, setTotalHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    let arr = [];
    let childPosition = [];
    let childHeight = [];
    const child = ref.current.children;

    [...child].forEach((e) => {
      arr.push(e.getBoundingClientRect().height);
    });

    const childSum = arr.reduce((acc, child) => {
      childPosition.push(acc + child);
      return acc + child;
    }, 0);

    setPosition(childPosition);
    setHeight(arr);
    setTotalHeight(childSum);
  }, []);

  return (
    <div ref={ref} style={{ height: totalHeight }}>
      {React.Children.map(children || null, (child, i) => {
        return (
          <Slide index={i} position={position} height={height}>
            {child}
          </Slide>
        );
      })}
    </div>
  );
});
export default Slides;
