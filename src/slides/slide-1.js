import intro from "../assets/intro.png";
import React, { useEffect } from "react";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Padding } from "../components/Padding";
import { Logo } from "../components/Logo";
import { useCaseWrapperContext } from "../components/Slide";

export const Slide1 = () => {
  const [slideVisible, setSlideVisible] = React.useState(true);

  const { scrollY } = useViewportScroll();
  let { value } = useCaseWrapperContext();

  const updateTransform = (v) => {
    const transvar = transform(
      v - value + window.innerHeight,
      [0, window.innerHeight],
      [0, -600]
    );
    return transvar;
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
        style={{
          y: y,
          right: 0,
          width: "60%",
          position: "absolute",
        }}
      >
        <motion.img
          transition={{
            duration: 20,
            repeatType: "reverse",
            repeat: Infinity,
          }}
          animate={{ y: -1800 }}
          style={{ position: "absolute" }}
          src={intro}
          alt=""
        ></motion.img>
      </motion.div>
    </>
  );
};
