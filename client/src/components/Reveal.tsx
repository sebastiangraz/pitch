import React from "react";
import { motion } from "framer-motion";
import { useCaseWrapperContext } from "./Slide";
import { ThemeUIStyleObject } from "theme-ui";

interface RevealProps {
  children?: React.ReactNode;
  delay?: number;
  childDelay?: number;
  effect?: any;
  ease?: any;
  parentEffect?: any;
  duration?: number;
  parentDuration?: number;
  ignoreParentFade?: boolean;
  repeat?: boolean;
  repeatParent?: boolean;
  repeatTypeLoop?: boolean;
  childStyle?: any;
  sx?: ThemeUIStyleObject;
  rest?: any;
}

export const Reveal = React.memo(
  ({
    children,
    delay,
    childDelay,
    effect,
    ease,
    parentEffect,
    duration,
    parentDuration,
    ignoreParentFade,
    repeat,
    repeatParent,
    repeatTypeLoop,
    childStyle,
    sx,
    ...rest
  }: RevealProps) => {
    const { parentValues } = useCaseWrapperContext();
    const delayVal = delay ? delay : 0.05;
    const effectVal = React.useMemo(
      () => (effect ? effect : [{ opacity: 0 }, { opacity: 1 }]),
      [effect]
    );
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
            repeatDelay: 0,
            repeatType: repeatTypeLoop ? "loop" : "reverse",
          }),
        },
      },
    };

    const childVariant = {
      hidden: effectVal[0],
      visible: (custom: number) => ({
        ...effectVal[1],
        transitionEnd: {
          color: "var(--theme-ui-colors-text)",
        },
        transition: {
          ease: ease ? ease : [0.83, 0, 0.17, 1],
          duration: durationVal,
          delay:
            delayVal +
            custom *
              ((childDelay ? childDelay : 0.4) /
                React.Children.count(children)),
          ...(repeat && {
            repeat: Infinity,
            repeatDelay: 0,
            repeatType: repeatTypeLoop ? "loop" : "reverse",
          }),
        },
      }),
    };

    const motionPrintChecker = {
      ...(parentValues?.isPrinting
        ? { initial: "visible" }
        : {
            initial: "hidden",
            whileInView: "visible",
          }),
    };

    return (
      <motion.div
        whileInView="visible"
        key={parentValues?.isPrinting ? "print" : null}
        {...rest}
        {...motionPrintChecker}
        variants={!ignoreParentFade ? parentVariant : undefined}
      >
        {React.Children.map(children || null, (child, i) => {
          return (
            <motion.div
              style={{
                willChange: "transform",
                originX: 0.5,
                originY: 0.5,
                ...childStyle,
              }}
              viewport={{ once: true }}
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
  }
);

export default Reveal;
