import React, { Children } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
export const Reveal = ({
  children,
  delay,
  effect,
  ease,
  parentEffect,
  duration,
  parentDuration,
  ignoreParentFade,
  repeat,
  repeatParent,
  repeatTypeLoop,
  initialInView,
  ...rest
}) => {
  const delayVal = delay ? delay : 0.05;
  const effectVal = effect ? effect : [{ opacity: 0 }, { opacity: 1 }];
  const parentEffectVal = parentEffect
    ? parentEffect
    : [{ opacity: 0 }, { opacity: 1 }];
  const durationVal = duration ? duration : 1;

  const parentVariant = {
    hidden: parentEffectVal[0],
    visible: {
      ...parentEffectVal[1],
      transition: {
        ease: ease ? ease : [0.83, 0, 0.17, 1],
        duration: parentDuration ? parentDuration : durationVal,
        delay: delayVal,
        ...(repeatParent && {
          repeat: Infinity,
          repeatDelay: 1,
          repeatType: "reverse",
        }),
      },
    },
  };

  const childVariant = {
    hidden: effectVal[0],
    visible: (custom) => ({
      ...effectVal[1],
      transition: {
        ease: ease ? ease : [0.83, 0, 0.17, 1],
        duration: durationVal,
        delay: delayVal + custom * (0.4 / React.Children.count(children)),
        ...(repeat && {
          repeat: Infinity,
          repeatDelay: 1,
          repeatType: repeatTypeLoop ? "loop" : "reverse",
        }),
      },
    }),
  };

  const parentControls = useAnimation();
  const childControls = useAnimation();

  // delay helps to prevent lag when clicking between cases
  const [ref, inView] = useInView({
    initialInView: initialInView,
    triggerOnce: false,
    delay: 200,
  });

  useEffect(() => {
    if (inView) {
      parentControls.start("visible");
      childControls.start("visible");
    } else {
      parentControls.start("hidden");
      childControls.start({ ...effectVal[0], transition: { duration: 0 } });
    }
  }, [parentControls, childControls, inView, effectVal]);

  return (
    <motion.div
      {...rest}
      style={{ willChange: "transform" }}
      ref={ref}
      animate={parentControls}
      initial="hidden"
      variants={!ignoreParentFade && parentVariant}
    >
      {React.Children.map(children || null, (child, i) => {
        return (
          <motion.div
            style={{ originX: 0.5, originY: 0.5 }}
            key={i}
            animate={childControls}
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

export default Reveal;
