import React from "react";
import {
  useSpring,
  transform,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
const Slide = ({ index, childPosition, children }) => {
  const position = childPosition[index] || [];

  const { scrollY } = useViewportScroll();
  const updatePos = (v) => {
    const progress = v - position + window.innerHeight * 2;

    return transform(
      progress,
      [0, window.innerHeight],
      [0, -window.innerHeight]
    );
  };

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
        y: y,
        zIndex: index,
        position: "fixed",
        left: 0,
        top: "100vh",
        borderRadius: "3vmin",
        border: "1px solid",
        background: `#aaa`,
        height: "100vh",
        width: "100vw",
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
