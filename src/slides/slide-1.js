import intro from "../assets/intro.png";
import React from "react";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Padding } from "../components/Padding";
import { useCaseWrapperContext } from "../components/Slide";

export const Slide1 = () => {
  const { scrollY } = useViewportScroll();
  let { value } = useCaseWrapperContext();

  const updateOpacity = (v) => {
    return transform(
      v - value + window.innerHeight,
      [0, window.innerHeight],
      [0, -300]
    );
  };

  const y = useSpring(
    useTransform(scrollY, (v) => updateOpacity(v)),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding>
        <h1>sebastian graz</h1>
        <h1>brand design</h1>
      </Padding>
      <motion.div
        style={{
          y: y,
          right: 0,
          top: 0,
          width: "70%",
          position: "absolute",
        }}
      >
        <img style={{ position: "absolute" }} src={intro} alt=""></img>
      </motion.div>
    </>
  );
};
