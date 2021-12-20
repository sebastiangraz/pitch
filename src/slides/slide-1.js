import intro from "../assets/intro.png";
import React from "react";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Reveal } from "../components/Reveal";
import { Padding } from "../components/Padding";
import { Logo } from "../components/Logo";
import { useCaseWrapperContext } from "../components/Slide";

export const Slide1 = () => {
  const { scrollY } = useViewportScroll();
  let { parentValues } = useCaseWrapperContext();

  const updateTransform = (v) => {
    return transform(
      v - parentValues.position + window.innerHeight,
      [0, window.innerHeight],
      [0, -600]
    );
  };

  const y = useSpring(
    useTransform(scrollY, (v) => updateTransform(v)),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding>
        <Logo />
        <h1>sebastian graz</h1>
        <h1>brand designer</h1>
      </Padding>
      <motion.div
        initial={{ y: 0 }}
        style={{
          y: y,
          right: 0,
          width: "60%",
          position: "absolute",
        }}
      >
        <Reveal
          ignoreParentFade
          ease={"linear"}
          initialInView
          effect={[{ y: 0 }, { y: -1800 }]}
          duration={18}
          repeat
        >
          <motion.img
            style={{ position: "absolute" }}
            src={intro}
            alt=""
          ></motion.img>
        </Reveal>
      </motion.div>
    </>
  );
};
