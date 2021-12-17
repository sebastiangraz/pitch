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
  const { scrollY } = useViewportScroll();
  const { innerWidth, innerHeight } = window;

  const updatePos = (v) => {
    return transform(
      v - position + innerHeight * 2,
      [0, innerHeight],
      [
        0,
        settings.horizontal
          ? -innerWidth + index * 24
          : -innerHeight + index * 24,
      ]
    );
  };

  const updateBg = (v) => {
    return transform(
      v - position + innerHeight * 2,
      [0, innerHeight / 1.2, innerHeight],
      ["hsl(186, 0%, 63%)", "hsl(0, 0%, 63%)", "hsl(0, 0%, 23%)"]
    );
  };

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
        borderRadius: "3vmin",
        border: "1px solid",
        height: "100vh",
        padding: "3rem",
        display: "flex",
        alignItems: "center",
        background: bg,
        ...(settings.horizontal
          ? {
              width: `calc(100vw - ${index * 24}px)`,
              x: y,
              left: "100vw",
              top: "0",
            }
          : { y: y, left: "0", top: "100vh", width: "100vw" }),
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
