import React from "react";
import Slide from "./Slide";
import { useWindowSize, useDebouncedEffect } from "./hooks";
import debounce from "lodash.debounce";
import { useViewportScroll, transform } from "framer-motion";

const Slides = React.memo(({ children }) => {
  const count = React.Children.count(children);
  const windowSize = useWindowSize();
  const ref = React.useRef();
  const [position, setPosition] = React.useState([]);
  const { scrollY } = useViewportScroll();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [debouncedVal, setDebouncedVal] = React.useState(0);

  React.useLayoutEffect(() => {
    let childPosition = [];
    const child = ref.current.children;

    [...child].reduce((acc) => {
      childPosition.push(acc + windowSize.height);
      return acc + windowSize.height;
    }, 0);

    setPosition(childPosition);
  }, [windowSize]);

  useDebouncedEffect(
    () => {
      setDebouncedVal(value);
    },
    [value],
    300
  );

  scrollY.onChange((e) => {
    setValue(e);
  });

  React.useEffect(() => {
    const val = position.reduce((prev, curr) => {
      return Math.abs(curr - debouncedVal) < Math.abs(prev - debouncedVal)
        ? curr
        : prev;
    }, 0);

    setActiveSlide(position.indexOf(val) + 1);
  }, [debouncedVal, position]);

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
