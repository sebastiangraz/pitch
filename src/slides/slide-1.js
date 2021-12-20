import intro from "../assets/intro.png";
import React from "react";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
  useAnimation,
} from "framer-motion";
import { Padding } from "../components/Padding";
import { Logo } from "../components/Logo";
import { useCaseWrapperContext } from "../components/Slide";

const variant = {
  active: {
    y: -1800,
  },
};

export const Slide1 = () => {
  const controls = useAnimation();
  const { scrollY } = useViewportScroll();

  const [active, setActive] = React.useState();
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

  React.useEffect(() => {
    if (parentValues.progress < 0.5) {
      controls.start("active");
    } else {
      controls.stop("active");
    }
  }, [controls, parentValues.progress]);

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
          variants={variant}
          animate={controls}
          style={{ position: "absolute" }}
          src={intro}
          alt=""
        ></motion.img>
      </motion.div>
    </>
  );
};
