import React from "react";
import Slide from "./Slide";
import { useWindowSize } from "./hooks";

const Slides = React.memo(({ children }) => {
  const count = React.Children.count(children);
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

  React.useEffect(() => {
    const handle = (event) => {
      if (event.key === "ArrowRight") {
        window.scrollBy(0, windowSize.height);
      } else if (event.key === "ArrowLeft") {
        window.scrollBy(0, -windowSize.height);
      }
    };

    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [windowSize.height]);

  return (
    <div ref={ref}>
      {React.Children.map(children || null, (child, i) => {
        return (
          <Slide index={i} childPosition={position} childCount={count}>
            {child}
          </Slide>
        );
      })}
    </div>
  );
});
export default Slides;
