import React from "react";
import {
  useSpring,
  transform,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
const Slide = ({ index, position, height, children }) => {
  const { scrollY } = useViewportScroll();

  const updatePos = (v) => {
    console.log(index);
    const progress = v;
    return transform(
      progress,
      [0, window.innerHeight],
      [0, -window.innerHeight * index]
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
        borderRadius: "3vmin",
        background: `#333${index}${index}${index}`,
        height: "100vh",
        width: "100vw",
        padding: "3rem",
      }}
    >
      {children}
    </motion.div>
  );
};
export default Slide;
