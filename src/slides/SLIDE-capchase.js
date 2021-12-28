/** @jsxImportSource theme-ui */

import capchase from "../assets/capchase.png";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";
import { useWindowSize } from "../components/useWindowSize";
import { keyframes } from "@emotion/react";

const slide = keyframes`
    0%   {  transform: translateY(10em);  }
    100%   { transform: translateY(-36em); }
    `;

export const SlideCapchase = () => {
  const { parentValues } = useCaseWrapperContext();
  const { scrollY } = useViewportScroll();
  const { height } = useWindowSize();

  const y = useSpring(
    useTransform(
      scrollY,
      [parentValues.position - height, parentValues.position],
      ["0em", -1000]
    ),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding sx={{ width: "40em" }}>
        <Text mb={0} sx={{ fontVariantCaps: "all-small-caps" }}>
          case study
        </Text>
        <Text sx={{ color: "brand", fontVariantCaps: "all-small-caps" }}>
          Capchase
        </Text>
        <Text sx={{ fontVariantCaps: "all-small-caps" }} mb={0}>
          Duration
        </Text>
        <Text sx={{ color: "brand" }}>4 months + retainer</Text>
        <Text sx={{ fontVariantCaps: "all-small-caps" }} mb={0}>
          Challenge
        </Text>
        <Text sx={{ color: "brand" }}>
          Position Capchase as a leader in non-dilutable financing. Look & feel
          like a business partner not a business tool.
        </Text>
      </Padding>

      <motion.div
        initial={{ y: 0 }}
        style={{
          y: y,
          right: 0,
          top: 0,
          width: "60%",
          position: "absolute",
        }}
      >
        <Reveal>
          <motion.img
            sx={{
              animationPlayState:
                parentValues.progress <= 0.2 ? "running" : "paused",
              animationName: `${slide}`,
              animationDuration: "10s",
              animationFillMode: "both",
              animationDirection: "alternate",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
            src={capchase}
            alt=""
          ></motion.img>
        </Reveal>
      </motion.div>
    </>
  );
};
