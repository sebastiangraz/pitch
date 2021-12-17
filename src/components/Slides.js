import React from "react";
import Slide from "./Slide";
import { useWindowSize } from "./useWindowSize";
const Slides = React.memo(({ children }) => {
  const windowSize = useWindowSize();

  const ref = React.useRef();

  const [position, setPosition] = React.useState([]);

  React.useLayoutEffect(() => {
    let childPosition = [];
    const child = ref.current.children;

    [...child].reduce((acc) => {
      childPosition.push(acc + windowSize.height);
      return acc + windowSize.height;
    }, 0);

    setPosition(childPosition);
  }, [windowSize]);

  return (
    <div ref={ref}>
      {React.Children.map(children || null, (child, i) => {
        return (
          <Slide index={i} childPosition={position}>
            {child}
          </Slide>
        );
      })}
    </div>
  );
});
export default Slides;
