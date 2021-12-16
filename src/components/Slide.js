import React from "react";
import {
  useSpring,
  transform,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
const Slide = ({ index, childPosition, childHeight, children }) => {
  const height = React.useCallback(
    (pos) => childHeight[pos ? index - pos : index] || [],
    [childHeight, index]
  );
  const position = (pos) => childPosition[pos ? index - pos : index] || [];
  console.log(position());
  const { scrollY } = useViewportScroll();
  const updatePos = (v) => {
    const progress = v - position(0) + height(0) + window.innerHeight;

    return transform(progress, [0, height(0)], [0, -height(0)]);
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
      }}
    >
      {children}
    </motion.div>
  );
};
export default Slide;
