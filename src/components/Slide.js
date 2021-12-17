import React from "react";
import {
  useSpring,
  transform,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
const Slide = ({ index, childPosition, children }) => {
  const settings = {
    horizontal: true,
  };
  const position = childPosition[index] || [];
  const { scrollY } = useViewportScroll();
  const { innerWidth, innerHeight } = window;

  const updatePos = (v) => {
    return transform(
      v - position + innerHeight * 2,
      [0, innerHeight],
      [0, -innerWidth + index * 24]
    );
  };

  /* 
  Todos
  - Change bg color dep on completion
  - Option to switch orientation
  */

  const y = useSpring(
    useTransform(scrollY, (v) => updatePos(v)),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <motion.div
      style={{
        x: y,
        zIndex: index,
        position: "fixed",
        top: 0,
        left: "100vw",
        borderRadius: "3vmin",
        border: "1px solid",
        background: `#aaa`,
        height: "100vh",
        width: `calc(100vw - ${index * 24}px)`,
        padding: "3rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="slideContent"
        style={{
          height: "56.25em",
          width: "100%",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
export default Slide;
