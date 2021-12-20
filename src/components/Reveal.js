/** @jsxImportSource theme-ui */

import React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const Reveal = ({ trigger, children }) => {
  const parentVariant = {
    hidden: { opacity: 0.2 },
    visible: { opacity: 1 },
  };

  const childVariant = {
    hidden: { opacity: 0.2 },
    visible: (custom) => ({
      opacity: 1,

      transition: {
        ease: [0.83, 0, 0.17, 1],
        delay: custom * 0.1,
      },
    }),
  };

  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, trigger]);

  return (
    <motion.div
      sx={{ willChange: "transform" }}
      animate={controls}
      initial="hidden"
      variants={parentVariant}
    >
      {React.Children.map(children || null, (child, i) => {
        return (
          <motion.div
            sx={{ display: "grid" }}
            key={i}
            custom={i}
            variants={childVariant}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
