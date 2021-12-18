import React from "react";
import {
  useSpring,
  transform,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { settings } from "./settings";

const Slide = ({ index, childPosition, children }) => {
  const position = childPosition[index] || [];
  const positionN = childPosition[index + 1] || [];
  const { scrollY } = useViewportScroll();
  const { innerWidth, innerHeight } = window;
  const stagger = 20;

  const updatePos = (v) => {
    return transform(
      v - position + innerHeight * 2,
      [0, innerHeight],
      [
        0,
        settings.horizontal
          ? -innerWidth + index * stagger
          : -innerHeight + index * stagger,
      ]
    );
  };

  const updateBg = (v) => {
    return transform(
      v - positionN + innerHeight * 2,
      [0, innerHeight],
      [`hsl(30, 5%, ${index * 3 + 92}%)`, `hsl(30, 20%, ${index * 3 + 80}%)`]
    );
  };

  const updateScale = (v) => {
    return transform(
      v - positionN + innerHeight * 2,
      [0, innerHeight],
      [1, 0.98]
    );
  };

  const scale = useTransform(scrollY, (v) => updateScale(v), {
    damping: 12,
    mass: 0.1,
  });

  const bg = useTransform(scrollY, (v) => updateBg(v), {
    damping: 12,
    mass: 0.1,
  });

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
        zIndex: index,
        position: "fixed",
        borderRadius: "4vmin",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "start",
        background: bg,

        ...(settings.horizontal
          ? {
              width: `calc(100vw - ${index * stagger}px)`,
              x: y,
              left: "100vw",
              top: "0",
            }
          : { y: y, left: "0", top: "100vh", width: "100vw" }),
      }}
    >
      <motion.div
        className="slideContent"
        style={{
          transformOrigin: "left",
          scale: scale,
          height: "56.25em",
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
export default Slide;
